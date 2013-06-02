//= require ./Text

/**
 * @class jB.form.field.Password
 * @alias passwordfield
 * @extends jB.form.field.Text
 */
jB.form.field.Text.extend('jB.form.field.Password passwordfield', {
    $el: '<input type="password">'
})