module SCSSLint
  # Checks for a property declared twice in a rule set.
  class Linter::BalderDuplicateProperty < Linter
    include LinterRegistry

    def check_properties(node)
      static_properties(node).each_with_object({}) do |prop, prop_names|
        prop_key = property_key(prop)

        if existing_prop = prop_names[prop_key]
          source = source_from_range prop.source_range
          source_existing = source_from_range existing_prop.source_range
          if source =~ /(rem|px)/
            add_lint(prop, "Property `#{existing_prop.name.join}` already "\
                         "defined on line #{existing_prop.line}, current line #{prop.line}, '#{source_existing}' => '#{source}'")
            if ENV['FIX_IT']
              fix_duplicate_units_inline([prop.line, existing_prop.line])
            end
          end
        else
          prop_names[prop_key] = prop
        end
      end

      yield # Continue linting children
    end

    alias_method :visit_rule,     :check_properties
    alias_method :visit_mixindef, :check_properties

  private

    def fix_duplicate_units_inline(line_numbers)
      lines = IO.readlines(engine.filename).map.with_index do |line, line_number|
        if line_numbers.include? line_number+1
          line = fix_duplicate_units_line(line)
        end
        line
      end
      File.open(engine.filename, 'w') do |file|
        file.puts lines
      end
    end

    def fix_duplicate_units_line(line)
      if line =~ /[0-9\.]+px/
        line = line.gsub(/(?!\()(-?[0-9\.]+px)(?!\))/, 'rem(\1)')
      end
      if line =~ /[0-9\.]+rem/
        line = "// " + line
      end
      line
    end

    def static_properties(node)
      node.children
          .select { |child| child.is_a?(Sass::Tree::PropNode) }
          .reject { |prop| prop.name.any? { |item| item.is_a?(Sass::Script::Node) } }
    end

    # Returns a key identifying the bucket this property and value correspond to
    # for purposes of uniqueness.
    def property_key(prop)
      prop_key = prop.name.join
      prop_value = property_value(prop)

      # Differentiate between values for different vendor prefixes
      prop_value.to_s.scan(/^(-[^-]+-.+)/) do |vendor_keyword|
        prop_key << vendor_keyword.first
      end

      prop_key
    end

    def property_value(prop)
      case prop.value
      when Sass::Script::Funcall
        prop.value.name
      when Sass::Script::String
      when Sass::Script::Tree::Literal
        prop.value.value
      else
        prop.value.to_s
      end
    end
  end
end
