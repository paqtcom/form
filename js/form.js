/**
 * Way2Web Form helpers.
 */
class W2Form {
    /**
     * Constructor.
     *
     * @param {object} keyOptions
     */
    constructor(keyOptions) {
        this.version = '0.2.0';

        this.defaultKeys = {
            's':      'button.btn-primary[type=submit]',
            'a':      'a.btn-default',
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
    init() {
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
    setModern(customValue) {
        this.modern = customValue;

        return this;
    }

    /**
     * Get the modern variable.
     *
     * @return {boolean}
     */
    getModern() {
        return this.modern;
    }

    /**
     * Trigger the form when you click on the enter button.
     *
     * @param {object} event
     */
    submitOnEnter(event) {
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
    submit(event) {
        let button = $(this);
        let buttonName = button.attr('name');
        let buttonValue = button.val();
        let formId = button.attr('form');
        let form;

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
    keyPress(event) {
        let key = this.keys[event.key];

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
    click(key) {
        if ($(key).length > 0) {
            $(key)[0].click();
        }
    }
}
