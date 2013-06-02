//= require ./AbstractPanel
(function() {
    var animationMap = {
        slide: {
            show: 'slideDown'
            ,hide: 'slideUp'
        }
        ,fade: {
            show: 'fadeIn'
            ,hide: 'fadeOut'
        }
    }

    /**
     * @example
     * var link = jB.Component({
     *     el: '&lt;a href="#"&gt;'
     *     ,text: 'Tooltip'
     * })
     *
     * jB.Tooltip({
     *     target: link
     *     ,body: 'Tooltip'
     *     //,triggerType: 'click'
     * })
     *
     * link
     *
     * @class jB.Tooltip
     * @alias tooltip
     * @extends jB.Component
     */
    jB.AbstractPanel.extend('jB.Tooltip tooltip', {
        $cls: 'tooltip in top'
        ,$bodyOptions: '<div class="tooltip-inner"></div>'
        ,$typeClassPrefix: 'tooltip'
        ,$triggerType: 'hover'
        ,$placement: 'top'
        ,$animation: 'fade'
        ,$type: 'inverse'
        ,$arrowOptions: '<div class="tooltip-arrow"></div>'
        ,$hidden: true

        ,onRendered: function() {
            this.append(this.$arrowOptions)

            var me = this
            this.on('show', function() {
                me.target().after(me.el)
                me.updatePosition()
            })
        }

        /**
         * The action to take on target to show/hide the tooltip
         *
         * @attribute triggerType
         * @type String
         * @default 'hover'
         */

        /**
         * Get / Set the trigger type
         *
         * @method triggerType
         * @return {String|jB.Tooltip}
         * <ul>
         *   <li>String: The current trigger type
         *   <li>jB.Tooltip: this
         * </ul>
         */
        ,triggerType: function(type) {
            if (!arguments.length) {
                return this.$triggerType
            }

            this.$triggerType = type
            this.refreshTriggerAction()
            return this
        }

        /**
         * The target of tooltip.
         * <ul>
         *   <li>jQuerySelector: A valid jquery selector or jQuery object.
         *   <li>jB.Component: A jB.Component instance
         * </ul>
         *
         * @attribute target
         * @type {jQuerySelector|jB.Component}
         */

        /**
         * Get / Set the tooltip target
         *
         * @method target
         * @param {jQuerySelector|jB.Component} [target] <ul>
         *                                                 <li>jQuerySelector: A valid jquery selector or jQuery object.
         *                                                 <li>jB.Component: A jB.Component instance
         *                                               </ul>
         * @return {jQueryObject|jB.Component}
         */
        ,target: function(target) {
            if (!arguments.length) {
                return this.$target
            }

            if (target instanceof jB.Component) {
                target = target.el
            }

            this.$target = jB.$(target)
            this.refreshTriggerAction()

            return this
        }

        /**
         * @protected
         * @method refreshTriggerAction
         * @return {jB.Tooltip}
         */
        ,refreshTriggerAction: function() {
            var me = this
                ,target = this.target()

            switch (this.$triggerType) {
                case 'hover':
                    target.on('mouseenter.tooltip', function() {
                        me.show()
                    }).on('mouseleave.tooltip', function() {
                            me.hide()
                        })

                    this.bodyCmp().on({
                        'mouseenter.tooltip': function() {
                            me.stop().show()
                        }
                        ,'mouseleave.tooltip': function() {
                            me.stop().hide()
                        }
                    })
                    break

                case 'click':
                    target.on('click.tooltip', function() {
                        me.toggle()
                        return false
                    })
                    break

                case 'focus':
                    target.on('focus.tooltip', function() {
                        me.show()
                    }).on('blur.tooltip', function() {
                            me.hide()
                        })
                    break
            }
            return this
        }

        /**
         * How to position the tooltip. Four values are allowed:
         * <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>
         * @attribute placement
         * @type String
         * @default 'top'
         */

        /**
         * @method placement
         * @param {String} [placement] Four values are allowed:
         *                             <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>
         * @return {String|jB.Tooltip}
         * <ul>
         *   <li>String: If no argument provide, returns the current alignment
         *   <li>jB.Tooltip: this
         * </ul>
         */
        ,placement: function(placement) {
            if (!arguments.length) {
                return this.$placement
            }
            this.removeClass('top right bottom left').cls(placement)
            this.$placement = placement
            return this
        }

        /**
         * The animation type. Two value are allowed: <code>slide</code>, <code>fade</code>
         *
         * @attribute animation
         * @type Boolean|String
         * @default 'fade'
         */

        /**
         * Get / Set the animation type.
         * @method animation
         * @param {Boolean|String} [animation] Two value are allowed: <code>slide</code>, <code>fade</code>
         * @return {String|jB.Tooltip}
         * <ul>
         *   <li>String: If no argument provide, returns the current animation type
         *   <li>jB.Tooltip: this
         * </ul>
         */
        ,animation: function(animation) {
            if (!arguments.length) {
                return this.$animation
            }

            this.$animation = animation
            return this
        }

        /**
         * Show the tooltip.
         *
         * @method show
         * @return {jB.Tooltip}
         */
        ,show: function() {
            return this.toggle(true)
        }

        /**
         * Hide the tooltip.
         *
         * @method hide
         * @return {jB.Tooltip}
         */
        ,hide: function() {
            return this.toggle(false)
        }

        /**
         * True to hide the tooltip.
         *
         * @attribute hidden
         * @type Boolean
         * @default true
         */

        /**
         * Get / Set the hidden state.
         *
         * @method hidden
         * @param {Boolean} [state]
         * @return {Boolean|jB.Tooltip}
         * <ul>
         *   <li>Boolean: If no argument provide, returns the hidden state
         *   <li>jB.Tooltip: this
         * </ul>
         */
        ,hidden: function(state) {
            if (!arguments.length) {
                return this.$hidden
            }

            return this.toggle(state)
        }

        ,onShow: jB.noop
        ,onHide: jB.noop
        ,onToggle: jB.noop

        /**
         * Toggle show/hide state.
         *
         * @method toggle
         * @param {Boolean} [state]
         * @return {jB.Tooltip}
         */
        ,toggle: function(state) {
            var hidden = this.hidden()
            arguments.length || (state = hidden)

            if (state !== this.hidden()) {
                return this
            }

            var toggleEvent = jB.$.Event('toggle')
                ,stateEvent = jB.$.Event(state? 'show' : 'hide')


            this.trigger(toggleEvent, [state])
            this.trigger(stateEvent)

            if (toggleEvent.isDefaultPrevented() || stateEvent.isDefaultPrevented()) {
                return this
            }

            this.onToggle(state)
            this[state? 'onShow' : 'onHide']()

            this.$hidden = !state

            var me = this
                ,trigger = function() {
                    me.trigger('toggled', [state])
                    me.trigger(state? 'shown' : 'hidden')
                    if (!state) {
                        me.detach()
                    }
                }

            if (!this.$animation) {
                this.el.toggle(state)
                trigger()
                return this
            }

            var animationOption = this.$animation
            if ('string' == typeof animationOption) {
                animationOption = animationMap[this.$animation][state? 'show' : 'hide']
            }

            if (state) {
                switch (animationOption) {
                    case 'fadeIn':
                        this.el.hide()
                        break

                    case 'slideDown':
                        this.slideUp(0)
                        break
                }
            }
            return this.stop().animate(animationOption, function() {
                trigger()
            })
        }

        /**
         * @protected
         * @method updatePosition
         * @return {jB.Tooltip}
         */
        ,updatePosition: function() {
            var target = this.target()
                ,targetOffset = target.position()
                ,targetWidth = target.outerWidth()
                ,targetHeight = target.outerHeight()
                ,width = this.outerWidth()
                ,height = this.outerHeight()
                ,top
                ,left

            switch (this.$placement) {
                case 'top':
                    top = targetOffset.top - height
                    left = targetOffset.left + (targetWidth  - width) / 2
                    break

                case 'right':
                    top = targetOffset.top + (targetHeight - height) / 2
                    left = targetOffset.left + targetWidth
                    break

                case 'bottom':
                    top = targetOffset.top + targetHeight
                    left = targetOffset.left + (targetWidth  - width) / 2
                    break

                case 'left':
                    top = targetOffset.top + (targetHeight - height) / 2
                    left = targetOffset.left - width
            }
            this.css({top: top, left: left})
            return this
        }
    })
})()