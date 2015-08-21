define(['jquery'], function($){

  var _carousel = function($this) {

    var num_slides,
      $slider,
      $slides,
      $prev,
      $next,
      $caption,
      $pagination,
      $pagination_items,
      $pagination_label,
      autoscroll_interval,
      current_slide = 0;

      function update_caption() {
        var caption, credits, $current_slide;
        if ($caption.length > 0) {
          $current_slide = $($slides[current_slide]);
          caption = $current_slide.data('carousel-slide-caption');
          credits = $current_slide.data('carousel-slide-credits');
          $caption.html('<p>' + caption + '</p>');
        }
      }

      function update_pagination() {
        $pagination_items.each( function(index) {
          if (index === current_slide) {
            $(this).addClass('carousel-pagination__item--selected');
            $pagination_label.html( $(this).html() );
          } else {
            $(this).removeClass('carousel-pagination__item--selected');
          }
        });
      }

      function set_slide(num) {
        var translate;

        if (num < 0 || num >= num_slides) {
          return;
        }

        translate = num * (100 / num_slides) * -1;

        $slider.css('transform', 'translate3d(' + translate + '%,0px,0px)');
        current_slide = num;
        update_caption();
        update_pagination();

      }

      function prev() {
        var current = current_slide;
        current--;
        if (current < 0) {
          current = num_slides - 1;
        }
        set_slide(current);
      }

      function next() {
        var current = current_slide;
        current++;
        if (current >= num_slides) {
          current = 0;
        }
        set_slide(current);
      }

      function set_autoscroll(delay) {
        autoscroll_interval = window.setInterval(next, delay);
      }

      function clear_autoscroll() {
        if (autoscroll_interval) {
          window.clearInterval(autoscroll_interval);
        }
      }

      function click_next() {
        clear_autoscroll();
        next();
      }

      function click_prev() {
        clear_autoscroll();
        prev();
      }

      function click_pagination(index) {
        clear_autoscroll();
        set_slide(index);
      }


      function init() {
        $slider = $this.find('[data-carousel-slider]');
        $slides = $this.find('[data-carousel-slide]');
        $prev = $this.find('[data-carousel-prev]');
        $next = $this.find('[data-carousel-next]');
        $caption = $this.find('[data-carousel-caption]');
        $pagination = $this.find('[data-carousel-pagination]');
        $pagination_items = $this.find('[data-carousel-pagination-item]');
        $pagination_label = $this.find('[data-carousel-pagination-label]');
        num_slides = $slides.length;

        $slides.each( function() {
          $(this).css('width', (100/num_slides) + '%');
        });

        $slider.css('width', (100 * num_slides) + '%');
        $slider.css('transform', 'translate3d(0%,0px,0px)');

        $next.on('click', click_next);
        $prev.on('click', click_prev);

        $pagination_items.each( function(index) {
          $(this).on('click', function() {
            click_pagination(index);
          });
        });

        update_caption();
        update_pagination();

        if ($this.data('carousel-auto-scroll') !== undefined) {
          set_autoscroll(5000);
        }
      }

      init();

  };

  $.fn.ai_carousel = function() {
    return this.each( function() {
      _carousel($(this));
    });
  };

  $(document).ready( function() {
    $('[data-carousel]').ai_carousel();
  });

  return _carousel;

});

