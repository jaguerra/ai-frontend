define(['jquery'], function($) {
    'use strict';

    function toggle_visibility() {
        $(this).toggleClass('footer-list--open');
    }

    function click_list(event) {
        var $options = $(this).parent();
        $options.each(toggle_visibility);
        event.stopImmediatePropagation();
        return false;
    }

    $(document).ready(function(){
        $('.footer-list__link--title').on('click', click_list);
    })
});