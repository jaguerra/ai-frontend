define(['jquery', 'magnific-popup'], function($){

  var _lightbox = (function() {

    var base_options_iframe = {
      mainClass: 'ai-lightbox-popup ai-lightbox-popup--iframe',
      type: 'iframe'
    };

    var base_options_image = {
      type: 'image',
      mainClass: 'ai-lightbox-popup ai-lightbox-popup--image',
      closeOnContentClick: true,
      image: {
        verticalFit: true
      }
    };

    var base_options_image_gallery = {
      type: 'image',
      mainClass: 'ai-lightbox-popup ai-lightbox-popup--image ai-lightbox-popup--image-gallery',
      closeOnContentClick: true,
      image: {
        verticalFit: true
      },
      gallery: {
        enabled: true
      }
    };

    function open_iframe(url) {
      var options = {
        items: {
          src: url
        }
      };
      $.extend( true, options, base_options_iframe);
      $.magnificPopup.open(options);
    }

    function get_gallery_id_from_rel(rel) {
      var rel_match = rel.match(/lightbox\[(.+)\]/);
      if (rel_match !== null && rel_match[1] !== 'undefined') {
        return rel_match[1];
      } else {
        return false;
      }
    }

    function init_data_api() {

      var galleries_ids = [],
        galleries_visited = {},
        $lightbox_elements = $('[rel^=lightbox]'),
        $lightbox_elements_html = $('.ai-lightbox--html'),
        i = 0;

      function filter_gallery_id () {
        return $(this).data('lightbox_gallery_id') === galleries_ids[i];
      }


      // DOM elements with rel="lightbox[gallery_id]"
      // Each gallery_id stands for an indepentent gallery
      $lightbox_elements.each(function() {
        var rel = $( this ).attr('rel'),
          gallery = get_gallery_id_from_rel(rel);

        if (gallery !== false) {
          if (galleries_visited[gallery] === undefined) {
            galleries_visited[gallery] = true;
            galleries_ids.push( gallery );
          }
          $(this).data('lightbox_gallery_id', gallery);
        }
      });

      for(i=0;i < galleries_ids.length;i++) {
        $lightbox_elements.filter(filter_gallery_id).magnificPopup(base_options_image_gallery);
      }

      // DOM elements with rel="lightbox"
      $lightbox_elements.filter( function() {
        return $(this).data('lightbox_gallery_id') === undefined;
      }).magnificPopup(base_options_image);

      // DOM elements with class "ai-lightbox--html" get an iframe lightbox
      $lightbox_elements_html.magnificPopup(base_options_iframe);
    }

    return {
      'init_data_api': init_data_api,
      'open_iframe': open_iframe
    };

  })();

  $(document).ready(function() {
    _lightbox.init_data_api();
  });

  return _lightbox;

});
