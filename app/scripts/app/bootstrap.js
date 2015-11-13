define([
		'domReady'
], function(
	domReady
	) {
  'use strict';

	domReady(function(){

    require(['jquery'], function($) {
      $('html').removeClass('no-js');
    });

    require([
      'blocks/nav/nav',
      'blocks/carousel/carousel',
      'blocks/header/header'
    ]);

    if (document.querySelector('.dropdown') !== null) {
      require(['blocks/dropdown/dropdown']);
    }

    require(['picturefill', 'lazysizes-plugins/bgset/ls.bgset'], function() {
           require(['lazysizes']);
    });

		if (!('placeholder' in document.createElement('input') && 'placeholder' in document.createElement('textarea'))) {
			require(['jquery', 'jqp/placeholder'], function($) {
				$('input, textarea').placeholder();
			});
		}

		if (document.querySelector('[data-ai-toggle="treemenu"]') !== null) {
			require(['jquery', 'jqp/treemenu'], function($) {
				$('[data-ai-toggle="treemenu"]').treemenu();
			});
		}

		if (document.querySelector('[rel*="lightbox"]') !== null) {
      require(['lightbox']);
		}

		if (document.querySelector('[rel*="galleria"]') !== null) {
			require(['jquery'], function (jQuery) {
				require(['galleria'], function (Galleria) {
					// Load the classic theme
          var theme_url = require.toUrl('galleria-theme.js');
					Galleria.loadTheme(theme_url);

					// Initialize Galleria
					jQuery('[rel*="galleria"]').each(function() {
            $(this).removeClass('galleria-root--preload');
						Galleria.run(this);
					});
				});
			});
		}

		if (document.querySelector('[data-toggle="collapse"]') !== null) {
      require(['bootstrap/collapse']);
		}

	});

});
