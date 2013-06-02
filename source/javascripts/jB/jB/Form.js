//= require ./Component
/**
 * @class jB.Form
 * @alias form
 * @extends jB.AbstractPanel
 * @example
 * jB.Form({
 *     items: {
 *         xtype: 'fieldset'
 *         ,legend: 'Legend'
 *         ,body: [
 *             {
 *                 xtype: 'label'
 *                 ,text: 'Label name'
 *             },{
 *                 xtype: 'textfield'
 *                 ,placeHolder: 'Type something...'
 *             },{
 *                 el: '&lt;span class="help-block"&gt;Example block-level help text here.&lt;/span&gt;'
 *             },{
 *                 xtype: 'label'
 *                 ,text: 'Check me out'
 *                 ,field: {
 *                     xtype: 'checkbox'
 *                 }
 *             },{
 *                 xtype: 'button'
 *                 ,text: 'Submit'
 *             }
 *         ]
 *     }
 * })
 *
 * @example
 * jB.Form({
 *     layout: 'search'
 *     ,items: [
 *         {
 *             xtype: 'textfield'
 *             ,name: 'email'
 *             ,placeHolder: 'Email...'
 *             ,search: true
 *         },{
 *             xtype: 'button'
 *             ,text: 'Search'
 *         }
 *     ]
 * })
 *
 * @example
 * jB.Form({
 *     layout: 'inline'
 *     ,items: [
 *         {
 *             xtype: 'textfield'
 *             ,placeHolder: 'Email'
 *             ,size: 'small'
 *         },{
 *             xtype: 'passwordfield'
 *             ,placeHolder: 'Password'
 *             ,size: 'small'
 *         },{
 *             xtype: 'label'
 *             ,text: 'Remember me'
 *             ,field: {
 *                 xtype: 'checkbox'
 *             }
 *         },{
 *             xtype: 'button'
 *             ,text: 'Submit'
 *         }
 *     ]
 * })
 *
 * @example
 * jB.Form({
 *     layout: 'horizontal'
 *     ,defaults: {
 *         xtype: 'form.controlgroup'
 *     }
 *     ,items: [
 *         {
 *             label: 'Email'
 *             ,controls: {
 *                 xtype: 'textfield'
 *                 ,placeHolder: 'Email'
 *             }
 *         },{
 *             label: 'Password'
 *             ,controls: {
 *                 xtype: 'passwordfield'
 *                 ,placeHolder: 'Password'
 *             }
 *         },{
 *             controls: [{
 *                 xtype: 'label'
 *                 ,text: 'Remember me'
 *                 ,field: {
 *                     xtype: 'checkbox'
 *                 }
 *             },{
 *                xtype: 'button'
 *                ,text: 'Sign in'
 *            }]
 *         }
 *     ]
 * })
 */
jB.AbstractPanel.extend('jB.Form form', {
    $el: '<form>'

    /**
     * The form layout. Four values are allowed:
     * <code>search</code>, <code>inline</code>, <code>horizontal</code>, <code>vertical</code>
     *
     * @attribute layout
     * @type String
     */

    /**
     * The form layout. Four values are allowed:
     * <code>search</code>, <code>inline</code>, <code>horizontal</code>, <code>vertical</code>
     *
     * @method layout
     * @param {String} [layout]
     * @return {String|jB.Form}
     * <ul>
     *   <li>String: If no argument provide, returns the current layout.
     *   <li>jB.Form: this
     * </ul>
     */
    ,layout: function(layout) {
        if (!arguments.length) {
            return this.$layout
        }

        if (layout == this.$layout) {
            return this
        }

        this.$layout = layout
        return this.removeClass('form-search form-inline form-horizontal form-vertical navbar-search')
            .addClass(layout == 'navbar-search'? 'navbar-search' : 'form-' + layout)
    }
})