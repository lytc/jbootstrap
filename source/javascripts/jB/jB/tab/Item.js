//= require ../nav/Item

/**
 * @class jB.tab.Item
 */
jB.def('jB.tab.Item', {
    /**
     * @class jB.tab.Item
     * @constructor
     * @param {jB.Tab} tab
     * @param {Object} options
     */
    constructor: function(tab, options) {
        this.tab = tab
        this.options = options

        this.navCmp().tabItem = this.bodyCmp().tabItem = this
    }

    /**
     * Get nav component.
     *
     * @method navCmp
     * @return {jB.nav.Item}
     */
    ,navCmp: function() {
        if (!this.$navCmp) {
            this.$navCmp = jB.nav.Item({
                text: this.options.title
            })

            var me = this
            this.$navCmp.innerCmp().click(function() {
                me.active()
                return false
            })
        }
        return this.$navCmp
    }

    /**
     * Get body component.
     *
     * @method bodyCmp
     * @return {jB.Component}
     */
    ,bodyCmp: function() {
        if (!this.$bodyCmp) {
            this.$bodyCmp = jB.Component({
                cls: 'tab-pane'
            })

            this.$bodyCmp.items(this.options.body)
        }

        return this.$bodyCmp
    }

    /**
     * Activate this tab item.
     *
     * @method active
     * @return {jB.tab.Item}
     */
    ,active: function() {
        if (this.navCmp().hasClass('active')) {
            return this
        }

        this.navCmp().radioClass('active')
        this.bodyCmp().radioClass('active')
        this.tab.trigger('change', this)

        return this
    }
})
