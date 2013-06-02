//= require ./AbstractField

/**
 * @class jB.form.field.Text
 * @alias textfield
 * @extends jB.form.field.AbstractField
 *
 * @example
 * jB.form.field.Text({
 *     name: 'search'
 *     ,placeHolder: 'Search...'
 *     ,search: true
 * })
 */
jB.form.field.AbstractField.extend('jB.form.field.Text textfield', {
    $el: '<input type="text">'

    /**
     * True to apply search query style.
     *
     * @attribute search
     * @type Boolean
     * @default false
     */

    /**
     * @method search
     * @param {Boolean} [state]
     * @return {Boolean|jB.form.field.Select}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the search style state
     *   <li>jB.form.field.Select: this
     * </ul>
     */
    ,search: function(state) {
        if (!arguments.length) {
            return this.hasClass('search-query')
        }

        return this.toggleClass('search-query', state)
    }
})