//= require ../Collapse

/**
 * @class jB.navbar.Container
 * @alias navbar.container
 * @extends jB.AbstractPanel
 */
jB.AbstractPanel.extend('jB.navbar.Container navbar.container', {
    $cls: 'container'

    ,body: function() {
        return this.bodyCmp().body.apply(this.bodyCmp(), arguments)
    }

    ,bodyCmp: function() {
        if (!this.$bodyCmp) {
            this.$bodyCmp = jB.Collapse()
            this.append(this.$bodyCmp)
        }

        return this.$bodyCmp
    }
})