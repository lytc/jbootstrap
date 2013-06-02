//= require ./Component

/**
 * @example
 * jB.Menu({
 *   css: {
 *     display: 'block'
 *     ,position: 'static'
 *   }
 *   //,dropUp: true
 *   ,items: [
 *     {
 *       text: 'Action'
 *       ,menu: [
 *          {
 *              text: 'Second level'
 *          },{
 *              text: 'Second level'
 *          },{
 *              text: 'Second level'
 *          }
 *       ]
 *     },{
 *       text: 'Another action'
 *       ,href: '#'
 *     },{
 *       text: 'Disabled link'
 *       ,href: '#'
 *       ,disabled: true
 *     },'-',{
 *       text: 'Separated link'
 *       ,href: '#'
 *     }
 *   ]
 * })
 *
 * @class jB.Menu
 * @alias menu
 * @extends jB.Component
 */
jB.Component.extend('jB.Menu menu', {
    /**
     * @protected
     * @property $el
     * @type String
     */
    $el: '<ul>'

    /**
     * @protected
     * @property $cls
     * @type String
     */
    ,$cls: 'dropdown-menu'

    /**
     * @protected
     * @property $defaultItemType
     * @type String
     */
    ,$defaultItemType: 'menu.item'

    /**
     * @protected
     * @property $dividerXtype
     * @type String
     */
    ,$dividerXtype: 'menu.divider'

    /**
     * @method append
     * @param {Object|Array|jB.Component} el
     * @return {jB.Menu}
     */
    ,append: function(el) {
        if ('-' == el) {
            el = [el]
        }

        if (jB.$.isArray(el)) {
            for (var i = 0, len = el.length; i < len; ++i) {
                if ('-' == el[i]) {
                    el[i] = {
                        xtype: this.$dividerXtype
                    }
                }
            }
            arguments[0] = el
        }

        return this.callSuper(arguments)
    }

    /**
     * Enable / Disable the menu drop up behaviors.
     *
     * @attribute dropUp
     * @type Boolean
     * @default false
     */

    /**
     * Get / Set the menu drop up behaviors.
     *
     * @method dropUp
     * @param {Boolean} [state]
     * @return {Boolean|jB.Menu}
     * <ul>
     *   <li>Boolean: If no argument provide, return the drop up state.
     *   <li>jB.Menu: this
     * </ul>
     */
    ,dropUp: function(state) {
        if (!arguments.length) {
            return this.hasClass('dropup')
        }

        return this.toggleClass('dropup', state)
    }
})


