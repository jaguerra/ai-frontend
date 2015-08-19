define(['jquery', 'magnific-popup'], function($){
  $(document).ready(function() {

    var galleries_ids = [],
      galleries_visited = {},
      $lightbox_elements = $('[rel^=lightbox'),
      $lightbox_elements_html = $('.ai-lightbox--html'),
      i = 0;

    function get_gallery_id_from_rel(rel) {
      var rel_match = rel.match(/lightbox\[(.+)\]/);
      if (rel_match !== null && rel_match[1] !== 'undefined') {
        return rel_match[1];
      } else {
        return false;
      }
    }

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
      $lightbox_elements.filter( function() {
        return $(this).data('lightbox_gallery_id') === galleries_ids[i];
      }).magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        image: {
          verticalFit: true
        },
        gallery: {
          enabled: true
        }
      });
    }

    $lightbox_elements.filter( function() {
      return $(this).data('lightbox_gallery_id') === undefined;
    }).magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      image: {
        verticalFit: true
      }
    });

    $lightbox_elements_html.magnificPopup({
      type: 'iframe'
    });

  });
});

