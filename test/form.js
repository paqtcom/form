(function(Way2web) {
    'use strict';

    Way2web.form = null;

    /**
     * Call function if the dom is ready.
     */
    Way2web.onDomReady = function() {
        Way2web.form = new W2Form().init(document);
    };
})(window.Way2web = window.Way2web || {});

if (document.readyState != 'loading') {
    window.Way2web.onDomReady();
} else {
    document.addEventListener('DOMContentLoaded', window.Way2web.onDomReady);
}
