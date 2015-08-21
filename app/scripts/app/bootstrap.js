define([
		'domReady'
], function(
	domReady
	) {

	domReady(function(){

    require([
      'modules/nav',
      'modules/carousel',
      'modules/header'
    ]);

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
          var theme_url = require.toUrl('galleria-themes/classic/galleria.classic.js');
					Galleria.loadTheme(theme_url);

					// Initialize Galleria
					jQuery('[rel*="galleria"]').each(function() {
						Galleria.run(this);
					});
				});
			});
		}

	});

});
