define(['jquery'], function($){
  'use strict';

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

  }());

  var _search = function() {

    var q;

    function get_query_variable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      var i, pair;
      for (i=0;i<vars.length;i++) {
        pair = vars[i].split("=");
        if(pair[0] === variable){return pair[1];}
      }
      return(false);
    }

    function search_toggle() {
      $('[data-nav-search-btn]').toggleClass('is-active');
      $('[data-nav-search]').toggleClass('is-active');
    }

    $('[data-nav-search-btn]').on('click', function() {
      search_toggle();
    });

    q = get_query_variable('q');
    if (q) {
      search_toggle();
      $('[data-nav-search-input]').attr('value', decodeURIComponent(q));
    }

  };

  $(document).ready( function() {
    $(document).scroll( function() {
      _header_fixed.on_scroll();
    });
    _search();
  });

  return _header_fixed;

});
