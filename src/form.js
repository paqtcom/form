/**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */
function createElement() {
    const isSVG = document.documentElement.nodeName.toLowerCase() === 'svg';

    if (typeof document.createElement !== 'function') {
        // This is the case in IE7, where the type of createElement is "object".
        // For this reason, we cannot call apply() as Object is not a Function.
        return document.createElement(arguments[0]);
    } else if (isSVG) {
        return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
        return document.createElement.apply(document, arguments);
    }
}

const hasFormAttribute = () => {
    var form = createElement('form');
    var input = createElement('input');
    var div = createElement('div');
    var id = 'formtest' + (new Date()).getTime();
    var attr;
    var bool = false;

    form.id = id;

    // IE6/7 confuses the form idl attribute and the form content attribute, so we use document.createAttribute
    try {
        input.setAttribute('form', id);
    } catch (e) {
        if (document.createAttribute) {
            attr = document.createAttribute('form');
            attr.nodeValue = id;
            input.setAttributeNode(attr);
        }
    }

    div.appendChild(form);
    div.appendChild(input);

    document.documentElement.appendChild(div);

    bool = form.elements && form.elements.length === 1 && input.form === form;

    div.parentNode.removeChild(div);

    return bool;
};

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
        this.version = '1.0.0';

        this.defaultKeys = {
            's':      'button.btn-primary[type=submit]',
            'a':      'a.btn-default',
            'Delete': 'button.btn-danger[type=submit]'
        };
        this.keys = {};
        this.keyOptions = keyOptions;
        this.lastKey = null;

        this.modern = hasFormAttribute();
    }


    /**
     * Helper functions for forms.
     *
     * @param {object} element
     *
     * @return {object}
     */
    init(element) {
        this.keys = Object.assign({}, this.defaultKeys, this.keyOptions || {});
        element.addEventListener('keydown', this.keyPress.bind(this), false);

        if (!this.modern) {
            element.querySelector('button[type=submit][form]').addEventListener(
                'click',
                this.submit.bind(this),
                false
            );
            element.querySelector('form input.form-control').addEventListener(
                'keydown',
                this.submitOnEnter.bind(this),
                false
            );
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
            event.target.closest('form').submit();
        }
    }

    /**
     * Trigger the form when you click on a button with the form attribute.
     * The attribute form contains the id of the form.
     *
     * @param {object} event
     */
    submit(event) {
        let button = event.target;
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

        form = document.getElementById(formId);
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

        this.lastKey = event.key;

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
        if (document.querySelectorAll(key).length > 0) {
            document.querySelector(key).click();
        }
    }
}

if (typeof window === 'object') {
    window.W2Form = W2Form;
}

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = W2Form;
}
