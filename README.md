# Way2Web Form helpers.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

Fix the form atrtibute for old browsers, and add the key combinations to click on a button, like Ctrl+S to submit the form.

Add this to your javascript file:
```
new W2Form().init();
```

The default key combinations are Ctrl with the keys in the object:
```
{
    's':      'button.btn-primary[type=submit]',
    'a':      'a.btn-default',
    'Delete': 'button.btn-danger[type=submit]'
}
```

[downloads-image]: https://img.shields.io/npm/dm/way2web-form.svg
[npm-url]: https://www.npmjs.com/package/way2web-form
[npm-image]: https://img.shields.io/npm/v/way2web-form.svg
