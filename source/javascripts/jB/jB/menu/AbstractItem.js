//= require ../Component

/**
 * @class jB.menu.AbstractItem
 * @extends jB.Component
 */
jB.Component.extend('jB.menu.AbstractItem', {
    $el: '<li>'
    ,$hideOnClick: true

    ,onRendered: function() {
        var me = this
            ,parentMenu

        this.on('click', function(e) {
            parentMenu = me.parentMenu()
            if (parentMenu && me.$hideOnClick) {
                parentMenu.hide()
            } else {
                e.stopPropagation()
            }
        })
    }

    /**
     * True to disable this component, false otherwise.
     *
     * @attribute disabled
     * @type Boolean
     * @default false
     */

    /**
     * Get disable state or enable / disable this component.
     *
     * @method disabled
     * @param {Boolean} [state]
     * @return {Boolean|jB.menu.AbstractItem}
     * <ul>
     *     <li>Boolean: If no argument provide, return the disable state.
     *     <li>jB.menu.AbstractItem: this
     * </ul>
     */
    ,disabled: function(state) {
        var result = this.callSuper(arguments)

        if (!arguments.length) {
            return result
        }

        this.innerCmp()[state? 'on' : 'off']('click.disable-click-no-href', false)
        return this
    }

    /**
     * True to active this component, false otherwise.
     *
     * @attribute activated
     * @type Boolean
     * @default false
     */

    /**
     * Get active state or activate / deactivate this component.
     *
     * @method activated
     * @param {Boolean} [state]
     * @return {Boolean|jB.menu.AbstractItem}
     * <ul>
     *     <li>Boolean: If no argument provide, return the active state.
     *     <li>jB.menu.AbstractItem: this
     * </ul>
     */
    ,activated: function(flag) {
        if (!arguments.length) {
            return this.hasClass('active')
        }

        return this.toggleClass('active', flag)
    }

    /**
     * Whether to not to hide the owning menu when this item is clicked.
     *
     * @attribute hideOnClick
     * @type Boolean
     * @default false
     */

    /**
     * Whether to not to hide the owning menu when this item is clicked.
     *
     * @method hideOnClick
     * @param {Boolean} [state]
     * @return {Boolean|jB.menu.AbstractItem}
     * <ul>
     *     <li>Boolean: If no argument provide, return the hideOnClick state.
     *     <li>jB.menu.AbstractItem: this
     * </ul>
     */
    ,hideOnClick: function(state) {
        if (!arguments.length) {
            return this.$hideOnClick
        }

        this.$hideOnClick = state
        return this
    }

    /**
     * Get inner component.
     *
     * @method innerCmp
     * @return {jB.Component}
     */
    ,innerCmp: function() {
        if (!this.$innerCmp) {
            var me = this
                ,hideMenuHandler = function() {
                    me.removeClass('open')
                }

            this.$innerCmp = jB.Component({
                el: this.$innerEl
                ,click: function() {
                    if (!me.is('.dropdown')) {
                        return
                    }
                    me.toggleClass('open')

                    jB.doc.off('click', hideMenuHandler)
                    if (me.hasClass('open')) {
                        jB.defer(function() {
                            jB.doc.on('click', hideMenuHandler)
                        })
                    }

                    return false
                }
            })

            this.prepend(this.$innerCmp)
        }

        return this.$innerCmp
    }

    /**
     * Get text component.
     *
     * @method textCmp
     * @return {jB.Component}
     */
    ,textCmp: function() {
        if (!this.$textCmp) {
            this.$textCmp = jB.Component('<span>')
            this.innerCmp().append(this.$textCmp)
        }

        return this.$textCmp
    }

    /**
     * The menu item icon.
     * <ul>
     *   <li>String: Type of the Icon
     *   <li>Object: The options apply to this Icon
     *   <li>jB.Icon: A instanceof jB.Icon
     * </ul>
     * @attribute icon
     * @type String|Object|jB.Icon
     */

    /**
     * Get / Set icon for this Button.
     *
     * @method icon
     * @param {String|Object|jB.Icon} [options]
     *   <ul>
     *     <li>String: Type of the Icon
     *     <li>Object: The options apply to this Icon
     *   </ul>
     * @return {jB.Icon|jB.menu.AbstractItem}
     */
    ,icon: function(options) {
        if (!arguments.length) {
            return this.iconCmp()
        }

        if (options instanceof jB.Icon) {
            this.$iconCmp = options
            return this
        }

        if ('string' == typeof options) {
            options = {type: options}
        }

        this.iconCmp().options(options)
        return this
    }

    /**
     * The menu item icon alignment.
     *
     * @attribute iconAlign
     * @type String
     * @default 'left'
     */

    /**
     * Change the Icon alignment. Two values are allowed: <code>left</code> <code>right</code>
     *
     * @method iconAlign
     * @param {String} [align]
     * @return {Boolean|jB.menu.AbstractItem}
     */
    ,iconAlign: function(align) {
        if (!arguments.length) {
            return this.$iconAlign
        }

        this.iconCmp().removeClass('pull-left pull-right').cls('pull-' + align)
        this.$iconAlign = align
        return this
    }

    /**
     * Get the icon component.
     *
     * @method iconCmp
     * @return {jB.Icon}
     */
    ,iconCmp: function() {
        if (!this.$iconCmp) {
            this.$iconCmp = jB.Icon()
            this.innerCmp().prepend(this.$iconCmp)
        }

        return this.$iconCmp
    }

    /**
     * Get the menu component.
     *
     * @method menuCmp
     * @return {jB.Menu}
     */
    ,menuCmp: function() {
        if (!this.$menuCmp) {
            this.$menuCmp = jB.Menu()
            this.append(this.$menuCmp)
        }

        return this.$menuCmp
    }

    /**
     * The menu item text
     *
     * @attribute text
     * @type String
     */

    /**
     * Set the menu item text or get the menu item text component.
     *
     * @method text
     * @param {String} [text]
     * @return {jB.Component|jB.menu.AbstractItem}
     * <ul>
     *     <li>jB.Component: If no argument provide, return the menu item text component.
     *     <li>jB.menu.AbstractItem: this
     * </ul>
     */
    ,text: function(text) {
        if (!arguments.length) {
            return this.textCmp().text()
        }

        this.textCmp().text(text)
        return this
    }

    /**
     * The sub menu of this menu item.
     * <ul>
     *     <li>Object: The options apply to this menu.
     *     <li>Array: List of item apply to this menu.
     *     <li>jB.Menu: A instanceof jB.Menu
     * </ul>
     *
     * @attribute menu
     * @type Object|Array|jB.Menu
     *
     */

    /**
     * Get / Set the sub menu of this menu item.
     *
     * @method menu
     * @param {Object|Array|jB.Menu} options <ul>
     *                                          <li>Object: The options apply to this menu.
     *                                          <li>Array: List of item apply to this menu.
     *                                          <li>jB.Menu: A instanceof jB.Menu
     *                                       </ul>
     * @return {jB.Menu|jB.menu.AbstractItem}
     * <ul>
     *     <li>jB.Menu: The menu instance of this menu item.
     *     <li>jB.menu.AbstractItem: this
     * </ul>
     */
    ,menu: function(options) {
        if (!arguments.length) {
            return this.menuCmp()
        }

        this.cls('dropdown-submenu')
        this.innerCmp().cls('dropdown-toggle')

        if (options instanceof jB.Menu) {
            this.$menuCmp = options
            return this
        }

        if (jB.$.isArray(options)) {
            options = {items: options}
        }

        this.menuCmp().options(options)

        return this
    }

    /**
     * The sub menu alignment. Two value are allowed: <code>left</code>, <code>right</code>
     *
     * @attribute menuAlign
     * @type String
     */

    /**
     * Get / Set the sub menu alignment.
     *
     * @method menuAlign
     * @param {String} align Two value are allowed: <code>left</code>, <code>right</code>
     * @return {String|jB.menu.AbstractItem}
     * <ul>
     *     <li>String: If no argument provide, return the current alignment.
     *     <li>jB.menu.AbstractItem: this
     * </ul>
     */
    ,menuAlign: function(align) {
        if (!arguments.length) {
            return this.$menuAlign
        }

        if ('left' == align) {
            this.cls('pull-left')
        }

        this.$menuAlign = align
        return this
    }

    /**
     * Get the parent menu.
     *
     * @method parentMenu
     * @return {jB.Menu}
     */
    ,parentMenu: function() {
        return this.parent().closest(':jb-menu')
    }
})