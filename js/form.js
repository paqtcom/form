/**
 * Way2Web Form helpers.
 *
 * @param {object} keyOptions
 *
 * @return {array}
 */
window.W2Form = function(keyOptions) {
    'use strict';

    var version = '0.1.2';

    var defaultKeys = {
        's':      'button.btn-primary[type=submit]',
        'a':      'a.btn-default',
        'Delete': 'button.btn-danger[type=submit]'
    };
    var keys = {};

    var modern = Modernizr.formattribute;

    /**
     * Helper functions for forms.
     *
     * @return {object}
     */
    function init() {
        keys = $.extend({}, defaultKeys, keyOptions || {});
        $(document).keydown(keyPress);

        if (!modern) {
            $('button[type=submit][form]').on('click', submit);
            $('form input.form-control').on('keydown', submitOnEnter);
        }

        return this;
    }

    /**
     * Set the modern variable, to simulate modern check.
     *
     * @param {boolean} customValue
     *
     * @return {object}
     */
    function setModern(customValue) {
        modern = customValue;

        return this;
    }

    /**
     * Get the modern variable.
     *
     * @return {boolean}
     */
    function getModern() {
        return modern;
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
        var button = $(this);
        var buttonName = button.attr('name');
        var buttonValue = button.val();
        var formId = button.attr('form');
        var form;

        if(event) {
            event.preventDefault();
        }

        if(!formId) {
            return;
        }

        form = $('#' + formId);
        if(buttonName && buttonValue) {
            form.append('<input type="hidden" name="' + buttonName + '" value="' + buttonValue + '">');
        }

        if (form.length > 0) {
            form.submit();
        }
    }

    /**
     * Check if you press a key combination if there is a element to click.
     *
     * @param {object} event
     */
    function keyPress(event) {
        var key = keys[event.key];

        if (event.ctrlKey && key && event.target.tagName != 'INPUT' && event.target.tagName != 'TEXTAREA') {
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
        setModern:     setModern,
        getModern:     getModern,
        submit:        submit,
        submitOnEnter: submitOnEnter,
        keyPress:      keyPress,
        click:         click,
        version:       version
    };
};
