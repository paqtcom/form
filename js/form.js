/**
 * Way 2 Filter.
 *
 * @param {object} keyOptions
 *
 * @return {array}
 */
window.W2Filter = function(keyOptions) {
    'use strict';

    var version = '0.0.2';

    var defaultKeys = {
        's':      'button.btn-primary[type=submit]',
        'a':      'a.btn-default',
        'Delete': 'button.btn-danger[type=submit]'
    };
    var keys = {};

    /**
     * Helper functions for forms.
     */
    function init() {
        keys = $.extend({}, defaultKeys, keyOptions || {});
        $(document).keydown(keyPress);

        if (!Modernizr.formattribute) {
            $('button[type=submit][form]').on('click', submit);
            $('form input.form-control').on('keydown', submitOnEnter);
        }
    }

    /**
     * Trigger the form when you click on the enter button.
     *
     * @param {object} event
     */
    function submitOnEnter(event) {
        if (event.key == 'Enter') {
            $(this).closest('form').submit();
        }
    }

    /**
     * Trigger the form when you click on a button with the form attribute.
     * The attribute form contains the id of the form.
     *
     * @param {object} event
     */
    function submit(event) {
        var form = $('#' + $(this).attr('form'));

        event.preventDefault();

        if (form) {
            submit();
        }
    }

    /**
     * Check if you press a key combination if there is a element to click.
     *
     * @param {object} event
     */
    function keyPress(event) {
        var key = keys[event.key];

        if (event.ctrlKey && key) {
            event.preventDefault();
            click(key);
        }
    }

    /**
     * Click on an element.
     *
     * @param {string} key
     */
    function click(key) {
        if ($(key).length > 0) {
            $(key)[0].click();
        }
    }

    return {
        init:          init,
        submit:        submit,
        submitOnEnter: submitOnEnter,
        keyPress:      keyPress,
        click:         click,
        version:       version
    };
};
