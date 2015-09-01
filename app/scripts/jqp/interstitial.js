define(
  ['jquery', 'jqp/cookie'],
  function (jQuery) {
    'use strict';

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

    function setVisitCookie(settings){
      jQuery.cookie( settings.cookieName, '1', { path: '/' });
    }

    function isFirstVisit(settings){
      if( jQuery.cookie( settings.cookieName ) === '1'){
        return false;
      } else {
        return true;
      }
    }

    function openLightbox(settings){
      require(['domReady', 'lightbox'], function(domReady, lightbox) {
        domReady(function(){
          lightbox.open_iframe(settings.url);
        });
      });
    }





    jQuery.interstitial = function( action, options ) {

      var settings = jQuery.extend({}, jQuery.interstitial.defaults, options );

      if( action === 'init' || typeof action === 'undefined' ){

        setVisitCookie(settings);

      } else if(action === 'open'){

        if( isFirstVisit(settings) ){
          openLightbox(settings);
          setVisitCookie(settings);
        }
      }

      return this;

    };

    jQuery.interstitial.defaults = {
      cookieName: "interstitial",
      url: "",
      title: "",
      width: "750",
      height: "400"
    };
  }
);
