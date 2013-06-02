//= require ../Component

/**
 * @class jB.accordion.Item
 * @alias accordion.item
 * @extends jB.Component
 */

jB.Component.extend('jB.accordion.Item accordion.item', {
    $cls: 'accordion-group'
    ,$animation: true

    /**
     * @method animation
     * @param {Boolean} [state]
     * @return {Boolean|jB.accordion.Item}
     */
    ,animation: function(state) {
        if (arguments.length == 0) {
            return this.$animation
        }

        if (this.$bodyCmp) {
            this.$bodyCmp.animation(state)
        }

        this.$animation = state
        return this
    }

    /**
     * @method title
     * @param {String} [title]
     * @return {String|jB.accordion.Item}
     */
    ,title: function(title) {
        if (arguments.length == 0) {
            return this.getTitleAnchorCmp().html()
        }
        this.getTitleAnchorCmp().html(title)
        return this
    }

    /**
     * @method getTitleCmp
     * @return {jB.Component}
     */
    ,titleCmp: function() {
        if (!this.$titleCmp) {
            this.$titleCmp = jB.Component({
                cls: 'accordion-heading'
            })

            this.prepend(this.$titleCmp)
        }

        return this.$titleCmp
    }

    /**
     * @method getTitleAnchorCmp
     * @return {jB.Component}
     */
    ,getTitleAnchorCmp: function() {
        if (!this.$titleAnchorCmp) {
            this.$titleAnchorCmp = jB.Component({
                el: '<a>'
                ,cls: 'accordion-toggle'
                ,attr: {
                    href: '#'
                }
            })

            this.titleCmp().append(this.$titleAnchorCmp)
        }

        return this.$titleAnchorCmp
    }

    /**
     * @method body
     * @param {String|Array|Object|jB.Component} body
     * @chainable
     */
    ,body: function(body) {
        this.bodyCmp().body(body)
        return this
    }

    /**
     * @method bodyCmp
     * @return {jB.Component}
     */
    ,bodyCmp: function() {
        if (!this.$bodyCmp) {
            this.$bodyCmp = jB.accordion.item.Body({
                target: this.getTitleAnchorCmp()
                ,animation: this.$animation
            })
            this.append(this.$bodyCmp)
        }

        return this.$bodyCmp
    }

    /**
     * @method toggle
     * @param {Boolean} [silent=false]
     * @chainable
     */
    ,toggle: function(silent) {
        this.bodyCmp().toggle.apply(this.bodyCmp(), arguments)
        return this
    }
})