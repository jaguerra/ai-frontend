define(['jquery', 'jqp/cookie'], function ($) {
    'use strict';

    var $content = $('.cookies'),
        hiddenClass = 'cookies--hidden',
        closeBtnSelector = '.cookies__btn',
        persistCookieName = 'cookieAlert';

    function close() {
        $.cookie(persistCookieName, true, {expires: 365, path:'/'});
        $content.each(function () {
            var $this = $(this);
            $this.addClass(hiddenClass)
        });
    }

    function init() {
        if (!$.cookie(persistCookieName)) {
            $content.each(function () {
                var $this = $(this);
                $this.removeClass(hiddenClass);
                $this.find(closeBtnSelector).click(close);
            });
        }
    }

    $(function () {
        init();
    });
});
