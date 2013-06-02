//= require ./AbstractField

/**
 * @class jB.form.field.TextArea
 * @alias textarea
 * @extends jB.form.field.AbstractField
 *
 * @example
 * jB.form.field.TextArea({
 *     name: 'description'
 *     ,placeHolder: 'Type something...'
 * })
 */
jB.form.field.AbstractField.extend('jB.form.field.TextArea textarea', {
    $el: '<textarea rows="2">'

    /**
     * Specifies the visible height of a text area, in lines
     *
     * @attribute rows
     * @type Number
     * @default 2
     */

    /**
     * Get / Set the 'rows' attribute of this textarea
     *
     * @method rows
     * @param {Number} [rows]
     * @return {Number|jB.form.field.TextArea}
     * <ul>
     *   <li>Number: The 'rows' attribute value
     *   <li>jB.form.field.TextArea: this
     * </ul>
     */
    ,rows: function(rows) {
        if (!arguments.length) {
            return this.attr('rows')
        }

        return this.attr('rows', rows)
    }
})