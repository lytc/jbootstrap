//= require ./AbstractPanel

/**
 * @example
 * var btn = jB.Button({
 *     text: 'Toggle'
 * })
 * var collapse = jB.Collapse({
 *     target: btn
 *     //,collapsed: true
 *     //,offset: 22
 *     ,body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
 * });
 *
 * [btn, collapse]
 *
 * @class jB.Collapse
 * @alias collapse
 * @extends jB.Component
 */
jB.Component.extend('jB.Collapse collapse', {
    /**
     * @protected
     * @property $bodyEl
     * @type String
     * @default ''
     */
    $bodyEl: '<div>'

    /**
     * @protected
     * @property $collapsed
     * @type Boolean
     * @default false
     */
    ,$collapsed: false

    /**
     * @protected
     * @property $offset
     * @type Number
     * @default 0
     */
    ,$offset: 0

    /**
     * @protected
     * @property $animation
     * @type Boolean
     * @default true
     */
    ,$animation: true

    ,onRendered: function() {
//        this.css('overflow', 'hidden')
        if (this.$collapsed) {
            this.height(this.$offset)
        }
    }

    /**
     * The collapse body.
     *
     * @attribute body
     * @type String|Object|Array
     */

    /**
     * The collapse body.
     *
     * @method body
     * @param {String|Object|Array} [body]
     * @return {jB.Component|jB.Collapse}
     * <ul>
     *   <li>jB.Component: If no argument provide, returns the body component instance.
     *   <li>jB.Collapse: this
     * </ul>
     */
    ,body: function(body) {
        if (!arguments.length) {
            return this.$bodyCmp
        }

        var bodyCmp = this.bodyCmp()
        bodyCmp['string' == typeof body? 'html' : 'items'](body)
        return this
    }

    /**
     * Get the collapse body component.
     *
     * @method bodyCmp
     * @return {jB.Component}
     */
    ,bodyCmp: function() {
        if (!this.$bodyCmp) {
            this.$bodyCmp = jB({el: this.$bodyEl})
            this.append(this.$bodyCmp)
        }

        return this.$bodyCmp
    }

    /**
     * The collapse target handler.
     *
     * @attribute target
     * @type String|Element|jQuery|jB.Component
     */

    /**
     * Get/Set the collapse target handler.
     *
     * @method target
     * @param {String|jQuery|jB.Component} [target]
     * @return {jQuery|jB.Component}
     */
    ,target: function(target) {
        if (!arguments.length) {
            return this.$target
        }

        if (!target instanceof jB.Component || !target instanceof jB.$) {
            target = jB.$(target)
        }

        var me = this
        target.on('click.collapse', function(e) {
            me.toggle()
            if (this instanceof HTMLAnchorElement) {
                return false
            }
        })

        return this
    }

    /**
     * The collapse offset.
     *
     * @attribute offset
     * @type Number
     * @default 0
     */

    /**
     * Get/Set the collapse offset.
     *
     * @method offset
     * @param {Number} [offset]
     * @return {Number|jB.Collapse}
     * <ul>
     *   <li>If no argument provide, returns the current offset number.
     *   <li>jB.Collapse: this
     * </ul>
     */
    ,offset: function(offset) {
        if (!arguments.length) {
            return this.$offset
        }

        this.$offset = offset
        if (this.$collapsed) {
            this.height(offset)
        }
        return this
    }

    /**
     * Enable / Disable the collapse animation affect.
     *
     * @attribute animation
     * @type Boolean
     * @default true
     */

    /**
     * Get / Set the collapse animation state.
     *
     * @method animation
     * @param {Boolean} [state]
     * @return {Boolean|jB.Collapse}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the animation state.
     *   <li>jB.Collapse: this
     * </ul>
     */
    ,animation: function(state) {
        if (!arguments.length) {
            return this.$animation
        }

        this.$animation = state
        return this
    }

    /**
     * True to render collapse collapsed.
     *
     * @attribute collapsed
     * @type Boolean
     * @default false
     */
    ,collapsed: function(state) {
        if (!arguments.length) {
            return this.$collapsed
        }

        if (state) {
            this.height(this.$offset)
        }

        this.$collapsed = state

        return this
    }

    /**
     * Toggle the collapsed state.
     *
     * @method toggle
     * @param {Boolean} [state]
     * @return {jB.Collapse}
     */
    ,toggle: function(state) {
        var collapsed = this.collapsed()
        arguments.length || (state = collapsed)

        if (state !== collapsed) {
            return this
        }

        var toggleEvent = jB.$.Event('toggle')
            ,stateEvent = jB.$.Event(state? 'expand' : 'collapse')

        this.trigger(toggleEvent, [!state])
        this.trigger(stateEvent)

        if (toggleEvent.isDefaultPrevented() || stateEvent.isDefaultPrevented()) {
            return this
        }

        this.$collapsed = !state
        this.css('overflow', 'hidden')
        var me = this
            ,height = state? this.bodyCmp().outerHeight() : this.offset()
            ,trigger = function() {
                me.trigger('toggled', [!state])
                me.trigger(state? 'expanded' : 'collapsed')
            }

        if (!this.$animation) {
            this.height(height)
            trigger()
            return this
        }

        this.finish().animate({
            height: height
        }, trigger)
        return this
    }

    /**
     * Fires before 'collapsed' state is changed.
     * @event toggle
     * @param {Boolean} collapsed The collapsed state
     */

    /**
     * Fires before the collapse is expanded.
     * @event expand
     */

    /**
     * Fires before the collapse is collapsed.
     * @event collapse
     */

    /**
     * Fires when 'collapsed' state is changed.
     * @event toggled
     * @param {Boolean} collapsed The collapsed state.
     */

    /**
     * Fires when the collapse is expanded.
     * @event expanded
     */

    /**
     * Fires when the collapse is collapsed.
     * @event collapsed
     */
})
