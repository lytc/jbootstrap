//= require ./AbstractItem

/**
 * @class jB.menu.Item
 * @alias menu.item
 * @extends jB.Component
 */

jB.menu.AbstractItem.extend('jB.menu.Item menu.item', {
    $innerEl: '<a href="#">'

    /**
     * The href attribute to use for the underlying anchor link.
     * @attribute href
     * @type String
     * @default '#'
     */

    /**
     * Get / Set t
     * he href attribute to use for the underlying anchor link.
     * @method href
     * @param {String} [href]
     * @return {String|jB.menu.Item}
     * <ul>
     *     <li>String: The anchor link
     *     <li>jB.menu.Item: this
     * </ul>
     */
    ,href: function(href) {
        if (!arguments.length) {
            return this.innerCmp().attr('href')
        }

        this.innerCmp().attr('href', href)
        return this
    }
})