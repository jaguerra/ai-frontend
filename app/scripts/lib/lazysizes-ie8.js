define(['jquery'], function ($) {
    'use strict';
    $('img[data-srcset-ie8]').each(function () {
        var $self = $(this);
        if (!$self.attr('src')) {
            $self.attr('src', $self.data('srcset-ie8'));
        }
    });
    $('[data-bgset-ie8]').each(function () {
        var $self = $(this);
        if ($self.css('background-image') === 'none') {
            $self.css('background-image', 'url(' + $self.data('bgset-ie8') + ')');
            $self.removeClass('lazyload');
        }
    });
    $('picture > img[data-src]').each(function () {
        var $self = $(this);
        $self.attr('src', $self.data('src'));
    });
});