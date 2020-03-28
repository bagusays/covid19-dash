import { initialRender } from './core/core';

window.onload = function() {
    initialRender('root')
    $('.sidenav').sidenav({
        draggable: true
    });
}