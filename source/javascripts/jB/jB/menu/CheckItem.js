//= require ./Item

/**
 * @class jB.menu.CheckItem
 * @alias menu.checkitem
 * @extends jB.menu.Item
 *
 * @example
 * jB.Menu({
 *     defaults: {
 *         on: {
 *             checkchange: function(e, checked, checkValue) {
 *                 alert('checked: ' + checked + ', check value:' + checkValue)
 *             }
 *         }
 *     }
 *     ,items: [
 *         {
 *             xtype: 'menu.checkitem'
 *             ,text: 'Check Item 1'
 *             ,checked: true
 *             ,checkValue: 1
 *         },{
 *             xtype: 'menu.checkitem'
 *             ,text: 'Check Item 2'
 *             ,checkValue: 2
 *         }
 *     ]
 *     ,css: {
 *         display: 'block'
 *         ,position: 'static'
 *     }
 * })
 *
 */
jB.menu.Item.extend('jB.menu.CheckItem menu.checkitem', {
    $innerEl: '<a href="#"></a>'
    ,$hideOnClick: false

    /**
     * True to render the menu item initially checked.
     *
     * @attribute checked
     * @type Boolean
     * @default false
     */

    /**
     * Get checked state or toggle checked state.
     * @method checked
     * @param {Boolean} [state]
     * @return {Boolean|jB.menu.CheckItem}
     * <ul>
     *     <li>Boolean: Checked state
     *     <li>jB.menu.CheckItem: this
     * </ul>
     */
    ,checked: function(state) {
        if (!arguments.length) {
            return this.getCheckboxCmp().prop('checked')
        }

        this.getCheckboxCmp().click()
        return this
    }

    /**
     * The checkbox value.
     *
     * @attribute checkValue
     * @type String
     */

    /**
     * Get / Set the checkbox value.
     *
     * @method checkValue
     * @param {String} [value]
     * @return {String|jB.menu.CheckItem}
     * <ul>
     *     <li>String: The checkbox value
     *     <li>jB.menu.CheckItem: this
     * </ul>
     */
    ,checkValue: function(value) {
        if (!arguments.length) {
            return this.getCheckboxCmp().val()
        }

        this.getCheckboxCmp().val(value)
    }

    /**
     * Get the inner component.
     * @method innerCmp
     * @return {jB.Component}
     */
    ,innerCmp: function() {
        var innerCmp = this.callSuper(arguments)

        if (!this.$hasListenerClickToggle) {
            this.$hasListenerClickToggle = true
            var me = this
            innerCmp.on('click', function(e) {
                if (me.getCheckboxCmp().is(e.target)) {
                    return
                }

                me.checked(!me.checked())
                return false
            })
        }

        this.getCheckboxCmp()
        return innerCmp
    }

    /**
     * Get checkbox component.
     *
     * @method getCheckboxCmp
     * @return {jB.Component}
     */
    ,getCheckboxCmp: function() {
        if (!this.$checkboxCmp) {
            this.$checkboxCmp = jB('<input type="checkbox">')

            this.innerCmp().prepend(this.$checkboxCmp)

            var me = this
            this.$checkboxCmp.on('change', function() {
                me.trigger('checkchange', [me.checked(), me.checkValue()])
            })
        }

        return this.$checkboxCmp
    }
})