define(['jquery'], function($){
  'use strict';

  var _filter = function($this) {
    var toggle = $this.find('.filters__toggle'),
      filters = $this.find('.filter');

    function toggle_filters() {
      $(filters).toggleClass('filter--active');
      $(toggle).toggleClass('filters__toggle--active');
    }

    $(toggle).click(function() {
      toggle_filters();
    });

  };

  $.fn.ai_filter = function() {
    return this.each( function() {
      _filter($(this));
    });
  };

  $(document).ready( function() {
    $('.filters').ai_filter();
  });

  return _filter;

});

