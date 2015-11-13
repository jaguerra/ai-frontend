define(['jquery'], function($){
  'use strict';

  var _dropdown = function($this) {
    var toggle = $this.children('.dropdown__toggle'),
      list = $this.children('.dropdown__list');

    function toggle_dropdown() {
      $(list).toggleClass('dropdown__list--active');
    }

    $(toggle).click(function() {
      toggle_dropdown();
    });

  };

  var _composite_dropdown = function($this) {
    $this.find('.dropdown__base').each( function() {
      _dropdown($(this));
    });
    _dropdown($this);
  };

  $.fn.ai_dropdown = function() {
    return this.each( function() {
      _composite_dropdown($(this));
    });
  };

  $(document).ready( function() {
    $('.dropdown').ai_dropdown();
  });

  return _composite_dropdown;

});
