define(['jquery'], function($) {
    'use strict';

    var urlActualTW = window.urlActualTW || document.location.href;

    function _share_twitter() {

        function share(summary, url) {
            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(summary) + '&url=' + encodeURIComponent(url) ,'accionatwitter','width=800,height=600,scrollbars=yes,menubar=yes,resizable=yes,location=yes');
        }

        $('.tweet').each( function() {
            var $this = $(this),
                $trigger = $this.find('.tweet__link'),
                url = $this.data('ai-share-url') || urlActualTWFirma,
                subtitular = $this.find('.tweet__quote').text();

            $trigger.click( function() {
                share(subtitular, url);
                return false;
            });

        });
    }

    $(document).ready( function() {
        _share_twitter();
    });

});
