define(['jquery'], function($){
  'use strict';
  $(document).ready( function() {

    $('.nav-list__item.has-subnav').on('click', function() {
      var expanded = $(this).prop('aria-expanded') === 'true';
      if (expanded) {
        $(this).prop('aria-expanded', 'false');
        $(this).find('[data-subnav-btn]').removeClass('is-open');
        $(this).find('[data-subnav]').removeClass('is-open');
      } else {
        $(this).prop('aria-expanded', 'true');
        $(this).find('[data-subnav-btn]').addClass('is-open');
        $(this).find('[data-subnav]').addClass('is-open');
      }
    });

    $('[data-lang-btn]').on('click', function() {
      $(this).toggleClass('is-active');
      $('[data-lang]').toggleClass('is-active');
    });

    $('[data-nav-btn]').on('click', function() {
      $('[data-nav]').toggleClass('is-active');
    });

    $('[data-nav-close]').on('click', function() {
      $('[data-nav]').toggleClass('is-active');
    });

  });
});
