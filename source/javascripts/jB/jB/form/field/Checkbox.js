//= require ./AbstractField

/**
 * @class jB.form.field.Checkbox
 * @alias checkbox
 * @extends jB.form.field.AbstractField
 *
 * @example
 * jB.form.field.Checkbox({
 *     checked: true
 * })
 */
jB.form.field.AbstractField.extend('jB.form.field.Checkbox checkbox', {
    $el: '<input type="checkbox">'

    /**
     * True to render checkbox checked
     *
     * @attribute checked
     * @type Boolean
     * @default false
     */

    /**
     * Get / Set checkbox checked state
     *
     * @method checked
     * @param {Boolean} [state]
     * @return {Boolean|jB.form.field.Checkbox}
     * <ul>
     *   <li>Boolean: Checkbox checked state
     *   <li>jB.form.field.Checkbox: this
     * </ul>
     */
    ,checked: function(state) {
        if (!arguments.length) {
            return this.prop('checked')
        }

        return this.prop('checked', state)
    }
})