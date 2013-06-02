//= require ./Component
/**
 * @example
 * jB.Tab({
 *    appendTo: '#tab'
 *    ,items: [
 *        {
 *            title: 'Item 1'
 *            ,body: '<p>Item 1</p>'
 *            ,active: true
 *        },{
 *            title: 'Item 2'
 *            ,body: '<p>Item 2</p>'
 *        }
 *    ]
 * })
 * @class jB.Tab
 * @alias tab
 * @extends jB.Component
 */
jB.Component.extend('jB.Tab tab', {
    $cls: 'tabbable'

    /**
     * Get the nav component.
     * 
     * @method navCmp
     * @return {jB.Nav}
     */
    ,navCmp: function() {
        if (!this.$navCmp) {
            this.$navCmp = jB.Nav({
                type: 'tabs'
            })
            this.prepend(this.$navCmp)
        }

        return this.$navCmp
    }

    /**
     * Get the body component.
     * 
     * @method bodyCmp
     * @return {jB.tab.Content}
     */
    ,bodyCmp: function() {
        if (!this.$contentCmp) {
            this.$contentCmp = jB.tab.Content()
            this.append(this.$contentCmp)
        }
        return this.$contentCmp
    }

    /**
     * The items of this Tab.
     * <ul>
     *   <li>Object: A single item options
     *   <li>Array: List of items of this Tab
     * </ul>
     *
     * @attribute items
     * @type Object|Array
     */

    /**
     * @method items
     * @param {Object|Array} items <ul>
     *                               <li>Object: A single item options
     *                               <li>Array: List of items of this Tab
     *                             </ul>
     * @return {jB.Tab}
     */
    ,items: function(items) {
        jB.$.isArray(items) || (items = [items])

        var item

        for (var i = 0, len = items.length; i< len; ++i) {
            item = jB.tab.Item(this, items[i])
            this.navCmp().append(item.navCmp())
            this.bodyCmp().append(item.bodyCmp())
        }

        return this
    }

    /**
     * Get a item of this Tab
     *
     * @method item
     * @param {Number} at
     * @return {jB.tab.Item}
     */
    ,item: function(at) {
        return this.navCmp().children(':jb-nav:eq(' + at + ')').tabItem
    }

    /**
     * True to enable pills style.
     * @attribute
     * @default false
     */

    /**
     * Enable / Disable pills style.
     *
     * @method pills
     * @param {Boolean} [state]
     * @return {Boolean|jB.Tab}
     * <ul>
     *   <li>Boolean: If no argument provide, return the current pills style state.
     *   <li>jB.Tab: this
     * </ul>
     */
    ,pills: function(state) {
        if (!arguments.length) {
            return this.hasClass('nav-pills')
        }

        this.navCmp().toggleClass('nav-pills', state)
        return this
    }

    /**
     * @see jB.Nav.stacked
     * @attribute stacked
     */

    /**
     * @method stacked
     * @param {Boolean} [state]
     * @return {Boolean|jB.Tab}
     * <ul>
     *   <li>String: If no argument provide, return the stacked state.
     *   <li>jB.Tab: this
     * </ul>
     */
    ,stacked: function(state) {
        if (!arguments.length) {
            return this.navCmp().stacked()
        }
        this.navCmp().stacked(state)
        return this
    }

    /**
     * The tabs direction.
     * <ul>
     *   <li>left: Put tabs on the left
     *   <li>below: Put tabs on the bottom
     *   <li>top: Put tabs on the top
     * </ul>
     * @attribute direction
     * @type String
     * @default 'top'
     */

    /**
     * Get / Set tabs direction.
     *
     * @method direction
     * @param {String} [direction] <ul>
     *                               <li>left: Put tabs on the left
     *                               <li>below: Put tabs on the bottom
     *                               <li>top: Put tabs on the top
     *                             </ul>
     * @return {String|jB.Tab}
     * <ul>
     *   <li>String: If no argument provide, returns the current direction.
     *   <li>jB.Tab: this
     * </ul>
     */
    ,direction: function(direction) {
        if (!arguments.length) {
            return this.$direction
        }

        if ('bottom' == direction) {
            this.removeClass('tabs-left').cls('tabs-below')
            this.append(this.navCmp())
        } else if ('left' == direction) {
            this.removeClass('tabs-below').cls('tabs-left')
            this.append(this.bodyCmp())
        } else {
            this.removeClass('tabs-left tabs-below')
            this.append(this.bodyCmp())
        }

        this.$direction = direction
        return this
    }
})
