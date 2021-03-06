require.config({
  baseUrl: 'scripts',
  paths: {
    'jquery': 'vendor/jquery',
    'domReady': 'vendor/domReady',
    'bootstrap': 'vendor',
    'lazysizes': 'vendor/lazysizes',
    'lazysizes-plugins/bgset/ls.bgset': 'vendor/ls.bgset',
    'picturefill': 'vendor/picturefill',
    'galleria': 'vendor/galleria/galleria-1.4.2',
    'galleria-theme': 'vendor/galleria/themes/classic/galleria.classic',
    'magnific-popup': 'vendor/jquery.magnific-popup',
    'blocks': '../blocks'
  },
  shim: {
    'lazysizes-plugins/bgset/ls.bgset':      { deps: ['lazysizes'] },
    'bootstrap/affix':      { deps: ['jquery'], exports: '$.fn.affix' },
    'bootstrap/alert':      { deps: ['jquery'], exports: '$.fn.alert' },
    'bootstrap/button':     { deps: ['jquery'], exports: '$.fn.button' },
    'bootstrap/carousel':   { deps: ['jquery'], exports: '$.fn.carousel' },
    'bootstrap/collapse':   { deps: ['jquery'], exports: '$.fn.collapse' },
    'bootstrap/dropdown':   { deps: ['jquery'], exports: '$.fn.dropdown' },
    'bootstrap/modal':      { deps: ['jquery'], exports: '$.fn.modal' },
    'bootstrap/popover':    { deps: ['jquery'], exports: '$.fn.popover' },
    'bootstrap/scrollspy':  { deps: ['jquery'], exports: '$.fn.scrollspy' },
    'bootstrap/tab':        { deps: ['jquery'], exports: '$.fn.tab'        },
    'bootstrap/tooltip':    { deps: ['jquery'], exports: '$.fn.tooltip' },
    'bootstrap/transition': { deps: ['jquery'], exports: '$.fn.transition' }
  },
  waitSeconds: 10
});
require(['app/bootstrap'], function() {
  'use strict';
});

