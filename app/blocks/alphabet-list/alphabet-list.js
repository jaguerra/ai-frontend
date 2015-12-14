define(['jquery'], function($){
  'use strict';

  var _alphabet_list = function() {

    var locations = new Array;

    var _alphabet_location = function($this) {
      var $link = $this,
        i = 0,
        $location = $($link.data('locations-link'));

      if ($location.length === 0) {
        return false;
      }

      function activate() {
        $location.addClass('locations--active');
        $link.addClass('alphabet-list__link--active');
      }

      function deactivate() {
        $location.removeClass('locations--active');
        $link.removeClass('alphabet-list__link--active');
      }

      $link.click( function() {
        for(i=0;i<locations.length;i++) {
          locations[i].deactivate();
        }
        activate();
        return false;
      });

      return {
        'activate': activate,
        'deactivate': deactivate
      };

    };

    $('[data-locations-link]').each( function() {
      var current_location;

      current_location = _alphabet_location($(this));
      if (current_location !== false) {
        locations.push(current_location);
      }
    });

  };

  $(document).ready( function() {
    _alphabet_list();
  });

  return _alphabet_list;

});
