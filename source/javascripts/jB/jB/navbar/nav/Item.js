//= require ../../menu/Item

/**
 * @class jB.navbar.nav.Item
 * @alias navbar.nav.item
 * @extends jB.menu.Item
 */

jB.menu.Item.extend('jB.navbar.nav.Item navbar.nav.item', {
    $hideOnClick: false

    /**
     * The navigation item dropdown menu
     * <ul>
     *     <li>Object: The options apply to dropdown menu
     *     <li>Array: The dropdown menu items
     *     <li>jB.Menu: A instanceof jB.Menu
     * </ul>
     *
     * @attribute menu
     * @type Object|Array|jB.Menu
     */

    /**
     * @see jB.menu.AbstractItem.menu
     * @method menu
     */
    ,menu: function(options) {
        var result = this.callSuper(arguments)
        if (arguments.length) {
            this.removeClass('dropdown-submenu').cls('dropdown')
            this.innerCmp().append('<span class="caret"></span>')
        }

        return result
    }
})