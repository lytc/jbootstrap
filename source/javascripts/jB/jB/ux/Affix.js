/**
 * @class jB.ux.Affix
 */
jB.def('jB.ux.Affix', {
    $statics: {
        defaults: {
            offset: 0
        }
    }

    ,constructor: function(el, options) {
        if (el instanceof jB.Component) {
            el = el.el
        } else {
            el = jB.$(el)
        }

        this.$el = el

        this.options = jB.$.extend({}, jB.ux.Affix.defaults, options)
        jB.win.on('scroll.affix ', jB.$.proxy(this.update, this))
            .on('click.affix',  jB.$.proxy(function () { setTimeout(jB.$.proxy(this.update, this), 1) }, this))

        this.update()
    }

    ,update: function() {
        if (!this.$el.is(':visible')) return

        var scrollHeight = jB.doc.height()
            , scrollTop = jB.win.scrollTop()
            , position = this.$el.offset()
            , offset = this.options.offset
            , offsetBottom = offset.bottom
            , offsetTop = offset.top
            , reset = 'affix affix-top affix-bottom'
            , affix

        if (typeof offset != 'object') offsetBottom = offsetTop = offset
        if (typeof offsetTop == 'function') offsetTop = offset.top()
        if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

        affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
            false    : offsetBottom != null && (position.top + this.$el.height() >= scrollHeight - offsetBottom) ?
            'bottom' : offsetTop != null && scrollTop <= offsetTop ?
            'top'    : false

        if (this.affixed === affix) return

        this.affixed = affix
        this.unpin = affix == 'bottom' ? position.top - scrollTop : null

        this.$el.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
        return this
    }
})