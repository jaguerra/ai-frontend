define(['jquery'], function ($) {
    'use strict';

    var urlActual = window.urlActual || document.location.href,
        urlActualFB = window.urlActualFB || urlActual,
        urlActualTW = window.urlActualFB || urlActual,
        urlActualWHA = window.urlActualFB || urlActual,
        tituloActual = window.tituloActual || '',
        tituloActualFB = window.tituloActualFB || tituloActual,
        tituloActualTW = window.tituloActualTW || tituloActual,
        tituloActualWHA = window.tituloActualWHA || tituloActual,
        ai_ogImage = window.ai_ogImage || '';

    function _share_facebook() {

        function share(title, summary, url, image) {
            window.open(
                'http://www.facebook.com/sharer.php?s=100&p[title]=' + encodeURIComponent(title)
                + '&p[summary]=' + encodeURIComponent(summary) + '&p[url]=' + encodeURIComponent(url)
                + '&p[images][0]=' + encodeURIComponent(image),
                'accionafacebook',
                'width=800,height=600,scrollbars=yes,menubar=yes,resizable=yes,location=yes'
            );
        }

        $('.share-list__link--facebook').each(function () {
            var $this = $(this),
                url = $this.data('ai-share-url') || urlActualFB,
                titular = $this.data('ai-share-title') || tituloActualFB,
                subtitular = $($this.data('ai-share-summary-html')).html() || '',
                imagen = $this.data('ai-share-image') || ai_ogImage;

            $this.click(function () {
                share(titular, subtitular, url, imagen);
                return false;
            });

        });
    }

    function _share_twitter() {

        function share(summary, url) {
            window.open(
                'https://twitter.com/intent/tweet?text=' + encodeURIComponent(summary)
                + '&url=' + encodeURIComponent(url),
                'accionatwitter',
                'width=800,height=600,scrollbars=yes,menubar=yes,resizable=yes,location=yes'
            );
        }

        $('.share-list__link--twitter').each(function () {
            var $this = $(this),
                url = $this.data('ai-share-url') || urlActualTW,
                subtitular = $($this.data('ai-share-summary-html')).html() || tituloActualTW;

            $this.click(function () {
                share(subtitular, url);
                return false;
            });

        });
    }

    function _share_whatsapp() {

        function share_url(summary, url) {
            var msg = 'Mira esto: ' + summary + ' ' + encodeURI(url);
            return 'whatsapp://send?text=' + encodeURIComponent(msg);
        }

        $('.share-list__link--whatsapp').each(function () {
            var $this = $(this),
                url = $this.data('ai-share-url') || urlActualWHA || urlActual,
                titular = $($this.data('ai-share-summary-html')).html() || tituloActual;

            $this.attr('href', share_url(titular, url));
        });
    }

    function _share_email() {

        function share_url(summary, url) {
            var msg = 'Mira esto: ' + summary + ' ' + encodeURI(url);
            return 'mailto:?body=' + encodeURIComponent(msg);
        }

        $('.share-list__link--email').each(function () {
            var $this = $(this),
                url = $this.data('ai-share-url') || urlActual,
                titular = $($this.data('ai-share-summary-html')).html() || tituloActualWHA;

            $this.attr('href', share_url(titular, url));
        });
    }

    $(document).ready(function () {
        _share_facebook();
        _share_twitter();
        _share_whatsapp();
        _share_email();
    });
});