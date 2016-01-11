define(
    ['jquery', 'jqp/cookie'],
    function (jQuery) {
        'use strict';

        var drivers = {
            'lightbox': driver_lightbox,
            'fullscreen': driver_fullscreen
        };

        function showTriggeredByCookie(settings) {
            return settings.alwaysShow === false;
        }

        function setVisitCookie(settings) {
            jQuery.cookie(settings.cookieName, '1', {path: '/'});
        }

        function isFirstVisit(settings) {
            if (jQuery.cookie(settings.cookieName) === '1') {
                return false;
            } else {
                return true;
            }
        }

        function driver_lightbox(settings) {
            require(['domReady', 'lightbox'], function (domReady, lightbox) {
                domReady(function () {
                    lightbox.open_iframe(settings.url);
                });
            });
        }

        function driver_fullscreen_close() {
            jQuery('.ai-interstitial').remove();
        }

        function driver_fullscreen(settings) {
            require(['handlebars', 'text!jqp/interstitial/fullscreen.hbs'], function (Handlebars, source) {
                var template = Handlebars.compile(source);
                var html = template(settings);
                jQuery('body').append(html);
                jQuery('.ai-interstitial__skip').on('click', function () {
                    driver_fullscreen_close();
                });
                if (settings.closeTimeoutMs > 0) {
                    window.setTimeout(driver_fullscreen_close, settings.closeTimeoutMs);
                }
            });
        }


        function open(settings) {
            return drivers[settings.driver](settings);
        }

        /**
         * Opens an external URL into a Lightbox.
         * Lightbox will only be triggered on the following constraints:
         * - "open" action is called
         * - it is the first page visit on the current session
         *
         * Usage:
         *
         * "init" action should be called on every page hit. "open" action should only be called on pages suitable for the
         * lightbox to open.
         *
         */
        jQuery.interstitial = function (action, options) {

            var settings = jQuery.extend({}, jQuery.interstitial.defaults, options);

            if (action === 'init' || typeof action === 'undefined') {

                if (showTriggeredByCookie(settings)) {
                    setVisitCookie(settings);
                }

            } else if (action === 'open') {

                if (showTriggeredByCookie(settings)) {
                    if (isFirstVisit(settings)) {
                        open(settings);
                        setVisitCookie(settings);
                    }
                } else {
                    open(settings);
                }
            }

            return this;

        };

        jQuery.interstitial.defaults = {
            cookieName: "interstitial",
            url: "",
            title: "",
            width: "750",
            height: "400",
            driver: "lightbox",
            skip_text: "Ir al contenido",
            alwaysShow: false,
            closeTimeoutMs: 0
        };
    }
);
