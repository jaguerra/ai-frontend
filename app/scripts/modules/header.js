define(['jquery'], function($){

  var _header_fixed = (function() {
    var previous_scroll_top = $(document).scrollTop();
    var header_fixed = false;

    function unfix_header() {
      if (header_fixed) {
        $('[data-header]').removeClass('header--transparent');
        $('[data-header]').removeClass('header--fixed');
        header_fixed = false;
      }
    }

    function fix_header() {
      if (!header_fixed) {
        $('[data-header]').addClass('header--transparent');
        setTimeout(function() {
          $('[data-header]').removeClass('header--transparent');
          $('[data-header]').addClass('header--fixed');
        }, 1);
        header_fixed = true;
      }
    }

    function hide_header() {
      $('[data-header]').addClass('header--transparent');
      header_fixed = false;
    }

    function on_scroll() {
      var scroll_top = $(document).scrollTop();

      if (scroll_top === 0) {
        unfix_header();
      } else if (scroll_top > 72) {
        if (scroll_top < previous_scroll_top) {
          fix_header();
        } else {
          hide_header();
        }
      }

      previous_scroll_top = scroll_top;
    }

    return {
      'on_scroll': on_scroll
    };

  })();

  $(document).ready( function() {
    $(document).scroll( function() {
      _header_fixed.on_scroll();
    });
  });

  return _header_fixed;

});
