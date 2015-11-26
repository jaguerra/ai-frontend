define(['jquery'], function($) {
  'use strict';

  function _boton_actua() {
    var $botones = $('.ai-accion-boton-actua');

    $botones.each(function() {
      var $this = $(this),
        href = $this.data('ai-accion-boton-actua-ref'),
        $ref = $(href);

      if ($ref.length !== 1) {
        return;
      }

      function visibilidad_boton() {
        var className = 'ai-accion-boton-actua--hidden';
        if ($this.offset().top > $ref.offset().top) {
          $this.addClass(className);
        } else {
          $this.removeClass(className);
        }
      }

      $(document).bind('scroll resize', function() {
        visibilidad_boton();
      });

      visibilidad_boton();

    });

  }

  $(document).ready( function() {
    _boton_actua();
  });

  return _boton_actua;

});
