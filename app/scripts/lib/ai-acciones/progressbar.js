define(['jquery'], function($) {
  'use strict';

  function _progressbar() {
    $('[data-ai-firmas]').each(function(){
      var el = $(this);
      var firmas = el.data('ai-firmas');
      var maxFirmas = el.data('ai-max-firmas');
      var width = 100;
      var newWidth = 0;
      if (firmas > 0 && maxFirmas > 0) {
        if (firmas > maxFirmas) {
          firmas = maxFirmas;
        }
        if (el.data('ai-max-firmas-origin') === 'sum') {
          newWidth = (firmas/maxFirmas) * (width * 0.9);
        } else {
          newWidth = (firmas/maxFirmas) * width;
        }
        el.attr('style', 'width: ' + newWidth + '%');
      }
    });
  }

  $(document).ready( function() {
    _progressbar();
  });

  return _progressbar;

});
