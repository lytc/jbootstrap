//= require ../Component

/**
 * @class jB.form.FieldContainer
 * @alias form.fieldcontainer
 * @extends jB.Component
 *
 * @example
 * jB.form.FieldContainer({
 *     addOnAppend: true
 *     ,items: [
 *         {
 *             xtype: 'textfield'
 *         },{
 *             xtype: 'form.addon'
 *             ,text: '.00'
 *         }
 *     ]
 * })
 *
 * @example
 * jB.form.FieldContainer({
 *     addOnPrepend: true
 *     ,items: [
 *         {
 *             xtype: 'form.addon'
 *             ,text: '@'
 *         },{
 *             xtype: 'textfield'
 *             ,placeHolder: 'Email'
 *         }
 *     ]
 * })
 *
 * @example
 * jB.form.FieldContainer({
 *     addOnAppend: true
 *     ,addOnPrepend: true
 *     ,items: [
 *         {
 *             xtype: 'form.addon'
 *             ,text: '$'
 *         },{
 *             xtype: 'textfield'
 *         },{
 *             xtype: 'form.addon'
 *             ,text: '.00'
 *         }
 *     ]
 * })
 *
 * @example
 * jB.form.FieldContainer({
 *     addOnAppend: true
 *     ,items: [
 *         {
 *             xtype: 'textfield'
 *         },{
 *             xtype: 'button'
 *             ,text: 'Go!'
 *         }
 *     ]
 * })
 *
 * @example
 * jB.form.FieldContainer({
 *     addOnAppend: true
 *     ,items: [
 *         {
 *             xtype: 'textfield'
 *         },{
 *             xtype: 'button'
 *             ,text: 'Search'
 *         },{
 *             xtype: 'button'
 *             ,text: 'Options'
 *         }
 *     ]
 * })
 *
 * @example
 * jB.form.FieldContainer({
 *     addOnAppend: true
 *     ,items: [
 *         {
 *             xtype: 'textfield'
 *         },{
 *             xtype: 'button.menu'
 *             ,text: 'Action'
 *             ,menu: [
 *                 {
 *                     text: 'Action'
 *                 },{
 *                     text: 'Another action'
 *                 }
 *             ]
 *         }
 *     ]
 * })
 *
 * @example
 * jB.form.FieldContainer({
 *     addOnAppend: true
 *     ,items: [
 *         {
 *             xtype: 'textfield'
 *         },{
 *             xtype: 'button.splitmenu'
 *             ,text: 'Action'
 *             ,menu: [
 *                 {
 *                     text: 'Action'
 *                 },{
 *                     text: 'Another action'
 *                 }
 *             ]
 *         }
 *     ]
 * })
 *
 * @example
 * jB.Form({
 *     layout: 'search'
 *     ,items: {
 *         xtype: 'form.fieldcontainer'
 *         ,addOnAppend: true
 *         ,items: [
 *             {
 *                 xtype: 'textfield'
 *             },{
 *                 xtype: 'button'
 *                 ,text: 'Search'
 *             }
 *         ]
 *     }
 * })
 */
jB.Component.extend('jB.form.FieldContainer form.fieldcontainer', {
    /**
     * True to append text, button to input field
     *
     * @attribute addOnAppend
     * @type Boolean
     * @default false
     */

    /**
     * Get / Set append add on state
     *
     * @method addOnAppend
      * @param {Boolean} [state]
     * @return {Boolean|jB.form.FieldContainer}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the add on append state
     *   <li>jB.form.FieldContainer: this
     * </ul>
     */
    addOnAppend: function(state) {
        if (!arguments.length) {
            return this.hasClass('input-append')
        }

        return this.toggleClass('input-append', state)
    }

    /**
     * True to append text, button to input field
     *
     * @attribute addOnPrepend
     * @type Boolean
     * @default false
     */

    /**
     * Get / Set prepend state
     *
     * @method addOnPrepend
     * @param {Boolean} [state]
     * @return {Boolean|jB.form.FieldContainer}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the add on prepend state
     *   <li>jB.form.FieldContainer: this
     * </ul>
     */
    ,addOnPrepend: function(state) {
        if (!arguments.length) {
            return this.hasClass('input-prepend')
        }

        return this.toggleClass('input-prepend', state)
    }
})