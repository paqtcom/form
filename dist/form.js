(function(Way2web) {
    'use strict';


    Way2web.form = null;

    /**
     * Call function if the dom is ready.
     */
    Way2web.onDomReady = function() {
        Way2web.form = new W2Form().init();
    };
})(window.Way2web = window.Way2web || {});

$(document).ready(window.Way2web.onDomReady);
