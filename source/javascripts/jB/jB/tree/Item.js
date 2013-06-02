//= require ../Component

jB.Component.extend('jB.tree.Item tree.item', {
    $el: '<li>'
    ,$cls: 'leaf'

    ,activated: function(flag) {
        this.toggleClass('active', flag)
    }

    ,id: function(id) {
        if (!arguments.length) {
            return this.$id
        }

        this.$id = id
        return this
    }

    ,getAnchorCmp: function() {
        if (!this.$anchorCmp) {
            var me = this
                ,hideMenuHandler = function() {
                    me.removeClass('open')
                }

            this.$anchorCmp = jB.Component({
                el: '<a>'
                ,attr: {
                    href: '#'
                }
                ,click: function() {
                    if (!me.$treeCmp || me.$treeCmp.is(':empty')) {
                        return
                    }

                    me.toggle()
                    return false
                }
            })

            this.prepend(this.$anchorCmp)
        }

        return this.$anchorCmp
    }

    ,textCmp: function() {
        if (!this.$textCmp) {
            this.$textCmp = jB.Component({
                el: '<span>'
                ,cls: 'x-text'
            })
            this.getAnchorCmp().append(this.$textCmp)
        }

        return this.$textCmp
    }

    ,icon: function(options) {
        if ('string' == typeof options) {
            options = {type: options}
        }

        this.iconCmp.options(options)
    }

    ,iconAlign: function(align) {
        this.iconCmp().removeClass('pull-left pull-right').cls('pull-' + align)
    }

    ,iconCmp: function() {
        if (!this.$iconCmp) {
            this.$iconCmp = jB.Icon()
            this.getAnchorCmp().prepend(this.$iconCmp)
        }

        return this.$iconCmp
    }

    ,getTreeCmp: function() {
        if (!this.$treeCmp) {
            this.$treeCmp = jB.Tree()
            this.append(this.$treeCmp)
        }

        return this.$treeCmp
    }

    ,text: function(text) {
        this.textCmp().text(text)
    }

    ,href: function(href) {
        this.getAnchorCmp().attr({href: href})
    }

    ,tree: function(options) {
        if (jB.$.isArray(options)) {
            options = {items: options}
        }

        this.getTreeCmp().options(options)
        this.toggleClass('leaf', !options.items.length)

        return this
    }

    ,items: function(items) {
        this.tree({items: items})
    }

    ,menuAlign: function(align) {
        if ('left' == align) {
            this.cls('pull-left')
        }
    }

    ,isExpanded: function() {
        return this.hasClass('expanded')
    }

    ,isLeaf: function() {
        return this.hasClass('leaf')
    }

    ,expand: function(animate) {
        this.addClass('expanded')
        this.getTreeCmp().slideUp(0).slideDown()

        return this
    }

    ,collapse: function() {
        var me = this
        this.getTreeCmp().slideUp(function() {
            me.removeClass('expanded')
        })
        return this
    }

    ,expanded: function(state) {
        return this[state? 'expand' : 'collapse']()
    }

    ,toggle: function() {
        return this.expanded(!this.isExpanded())
    }
})