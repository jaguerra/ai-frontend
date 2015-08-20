define([
		'domReady'
], function(
	domReady
	) {

	domReady(function(){

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

		if (document.getElementById('tx-solr-search')) {
			require(['jquery'], function($) {
				window.$ = $;
				window.jQuery = $;
			});
		}

		if (document.querySelector('[rel*="galleria"]') !== null) {
			require(['jquery'], function (jQuery) {
				require(['galleria'], function (Galleria) {
					// Load the classic theme
					Galleria.loadTheme('/fileadmin/templates/main/vendor/galleria/themes/classic/galleria.classic.js');

					// Initialize Galleria
					jQuery('[rel*="galleria"]').each(function(index, obj) {
						Galleria.run(obj);
					});
				});
			});
		}

	});

});
