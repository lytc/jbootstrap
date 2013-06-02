//= require ./AbstractField

/**
 * @class jB.form.field.Uneditable
 * @alias uneditablefield
 * @extends jB.form.field.AbstractField
 *
 * @example
 * jB.form.field.Uneditable({
 *     val: 'Some value here'
 * })
 */
jB.Component.extend('jB.form.field.Uneditable uneditablefield', {
    $el: '<span>'
    ,$cls: 'uneditable-input'

    /**
     * The value (text) of this field
     *
     * @attribute val
     * @type String
     */

    /**
     * @method val
     * @param {String} [val]
     * @return {String|jB.form.field.Uneditable}
     * <ul>
     *   <li>String: The text value of this field
     *   <li>jB.form.field.Uneditable: this
     * </ul>
     */
    ,val: function() {
        return this.text.apply(this, arguments)
    }
})