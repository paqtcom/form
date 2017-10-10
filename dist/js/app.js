'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Way2Web Form helpers.
 */
var W2Form = function () {
    /**
     * Constructor.
     *
     * @param {object} keyOptions
     */
    function W2Form(keyOptions) {
        _classCallCheck(this, W2Form);

        this.version = '0.2.0';

        this.defaultKeys = {
            's': 'button.btn-primary[type=submit]',
            'a': 'a.btn-default',
            'Delete': 'button.btn-danger[type=submit]'
        };
        this.keys = {};
        this.keyOptions = keyOptions;

        this.modern = Modernizr.formattribute;
    }

    /**
     * Helper functions for forms.
     *
     * @return {object}
     */


    _createClass(W2Form, [{
        key: 'init',
        value: function init() {
            this.keys = $.extend({}, this.defaultKeys, this.keyOptions || {});
            $(document).on('keydown', this.keyPress.bind(this));

            if (!this.modern) {
                $('button[type=submit][form]').on('click', this.submit);
                $('form input.form-control').on('keydown', this.submitOnEnter);
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

    }, {
        key: 'setModern',
        value: function setModern(customValue) {
            this.modern = customValue;

            return this;
        }

        /**
         * Get the modern variable.
         *
         * @return {boolean}
         */

    }, {
        key: 'getModern',
        value: function getModern() {
            return this.modern;
        }

        /**
         * Trigger the form when you click on the enter button.
         *
         * @param {object} event
         */

    }, {
        key: 'submitOnEnter',
        value: function submitOnEnter(event) {
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

    }, {
        key: 'submit',
        value: function submit(event) {
            var button = $(this);
            var buttonName = button.attr('name');
            var buttonValue = button.val();
            var formId = button.attr('form');
            var form = void 0;

            if (event) {
                event.preventDefault();
            }

            if (!formId) {
                return;
            }

            form = $('#' + formId);
            if (buttonName && buttonValue) {
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

    }, {
        key: 'keyPress',
        value: function keyPress(event) {
            var key = this.keys[event.key];

            if (event.ctrlKey && key && event.target.tagName != 'INPUT' && event.target.tagName != 'TEXTAREA') {
                event.preventDefault();
                this.click(key);
            }
        }

        /**
         * Click on an element.
         *
         * @param {string} key
         */

    }, {
        key: 'click',
        value: function click(key) {
            if ($(key).length > 0) {
                $(key)[0].click();
            }
        }
    }]);

    return W2Form;
}();
//# sourceMappingURL=app.js.map
