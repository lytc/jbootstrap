//= require ../AbstractPanel

/**
 * @class jB.form.FieldSet
 * @alias fieldset
 * @extends jB.AbstractPanel
 *
 * @example
 * jB.form.FieldSet({
 *     legend: 'Legend'
 *     ,body: [
 *         {
 *             xtype: 'textfield'
 *             ,placeHolder: 'Email'
 *         },{
 *             xtype: 'passwordfield'
 *             ,placeHolder: 'Password'
 *         }
 *     ]
 * })
 */
jB.AbstractPanel.extend('jB.form.FieldSet fieldset', {
    $el: '<fieldset>'
    ,$headerOptions: '<legend>'

    /**
     * The legend of this fieldset
     * <ul>
     *   <li>String: The legend text
     *   <li>Object: The options apply to the legend component
     * </ul>
     * @attribute legend
     * @type String|Object
     */

    /**
     * Get / Set the legend of this fieldset
     * @method legend
     * @param {String|Object} [options] <ul>
     *                                    <li>String: The legend text
     *                                    <li>Object: The options apply to the legend component
     *                                  </ul>
     * @return {jB.Component|jB.form.FieldSet}
     * <ul>
     *   <li>jB.Component: The legend component instance
     *   <li>jB.form.FieldSet: this
     * </ul>
     */
    ,legend: function(options) {
        if (!arguments.length) {
            return this.$legendCmp
        }

        if ('string' == typeof options) {
            options = {text: options}
        }

        this.headerCmp().options(options)
        return this
    }
})