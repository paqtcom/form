function t(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var e=t(require("jquery")),n=t(require("modernizr"));"object"==typeof module&&"object"==typeof module.exports&&(module.exports=function(){function t(t){this.version="1.0.0",this.defaultKeys={s:"button.btn-primary[type=submit]",a:"a.btn-default",Delete:"button.btn-danger[type=submit]"},this.keys={},this.keyOptions=t,this.modern=n.formattribute}var i=t.prototype;return i.init=function(){return this.keys=e.extend({},this.defaultKeys,this.keyOptions||{}),e(document).on("keydown",this.keyPress.bind(this)),this.modern||(e("button[type=submit][form]").on("click",this.submit),e("form input.form-control").on("keydown",this.submitOnEnter)),this},i.setModern=function(t){return this.modern=t,this},i.getModern=function(){return this.modern},i.submitOnEnter=function(t){"Enter"==t.key&&e(this).closest("form").submit()},i.submit=function(t){var n,i=e(this),r=i.attr("name"),o=i.val(),s=i.attr("form");t&&t.preventDefault(),s&&(n=e("#"+s),r&&o&&n.append('<input type="hidden" name="'+r+'" value="'+o+'">'),n.length>0&&n.submit())},i.keyPress=function(t){var e=this.keys[t.key];t.ctrlKey&&e&&"INPUT"!=t.target.tagName&&"TEXTAREA"!=t.target.tagName&&(t.preventDefault(),this.click(e))},i.click=function(t){e(t).length>0&&e(t)[0].click()},t}());
//# sourceMappingURL=form.js.map
