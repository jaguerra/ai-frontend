define(['jquery'], function($) {
  'use strict';

  var urlActualTWFirma = window.urlActualTWFirma || document.location.href,
    urlActualFBFirma = window.urlActualFBFirma || document.location.href,
    ai_ogImage = window.ai_ogImage || '';

  function _share_facebook() {

    function share(title, summary, url, image) {
      window.open('http://www.facebook.com/sharer.php?m2w&s=100&p[title]=' + encodeURIComponent(title) + '&p[summary]=' + encodeURIComponent(summary) + '&p[url]=' + encodeURIComponent(url) + '&p[images][0]=' + encodeURIComponent(image), 'accionafacebook', 'width=800,height=600,scrollbars=yes,menubar=yes,resizable=yes,location=yes');
    }

    $('.ai-accion-firma-compartir__facebook').each( function() {
      var $this = $(this),
        url = $this.data('ai-share-url') || urlActualFBFirma,
        titular = $this.data('ai-share-title'),
        subtitular = $($this.data('ai-share-summary-html')).html(),
        imagen = $this.data('ai-share-image') || ai_ogImage;

      $this.click( function() {
        share(titular, subtitular, url, imagen);
        return false;
      });

    });
  }

  function _share_twitter() {

    function share(summary, url) {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(summary) + '&url=' + encodeURIComponent(url) ,'accionatwitter','width=800,height=600,scrollbars=yes,menubar=yes,resizable=yes,location=yes');
    }

    $('.ai-accion-firma-compartir__twitter').each( function() {
      var $this = $(this),
        url = $this.data('ai-share-url') || urlActualTWFirma,
        subtitular = $($this.data('ai-share-summary-html')).html();

      $this.click( function() {
        share(subtitular, url);
        return false;
      });

    });
  }

  $(document).ready( function() {
    _share_facebook();
    _share_twitter();
  });

});
