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
        ,toggle: {
            show: 'show'
            ,hide: 'hide'
        }
    }

    /**
     * @example
     * jB.Alert({
     *     body: '<b>Holy guacamole!</b> Best check yo self, you\'re not looking too good.'
     *     //,animation: 'fade'     // fade, slide, true, false
     *     //,block: true           // true ,false
     *     ,closable: true        // true, false
     *     //,closeAction: 'remove' // hide, remove
     *     //,title: 'Alert title'
     *     //,type: 'error'         // info, success, warning, error, danger
     *     ,on: {
     *         close: function() {
     *             alert('close!')
     *         }
     *         ,closed: function() {
     *             alert('closed!')
     *         }
     *     }
     * })
     *
     * @class jB.Alert
     * @alias alert
     * @extends jB.Component
     */
    jB.AbstractPanel.extend('jB.Alert alert', {
        $cls: 'alert'
        ,$closeAction: 'hide'
        ,$animation: 'slide'
        ,$hidden: false

        /**
         * The alert title.
         * @attribute title
         * @type String
         */

        /**
         * Get / set alert title.
         *
         * @method title
         * @param {String} [title]
         * @return {jB.Component|jB.Alert}
         * <ul>
         *     <li>jB.Component: If no argument provide, returns the Alert title component
         *     <li>jB.Alert: this
         * </ul>
         */
        ,title: function(title) {
            if (!this.$title) {
                this.$title = jB('<h4>')
                this.header().append(this.$title)
            }

            if (!arguments.length) {
                return this.$title
            }

            this.$title.text(title)
            return this
        }

        /**
         * The alert animation type
         *
         * @attribute animation
         * @type String|Object
         * @default 'slide'
         */

        /**
         * Get / set / disable animation when show, hide or close the Alert
         *
         * @method animation
         * @param {Boolean|String} [type] Four values are allowed: <code>hide</code> <code>slide</code> <code>true</code>.
         *                                <code>false</code> to disable animation affect.
         * @return {Boolean|String|jB.Alert}
         *  <ul>
         *      <li>Boolean: If no argument provide, returns the animation state
         *      <li>String: If no argument provide, returns the animation type
         *      <li>jB.Alert: this Alert
         *  </ul>
         */
        ,animation: function(type) {
            if (!arguments.length) {
                return this.$animation
            }

            this.$animation = type
            return this
        }

        /**
         * The action to take when close the alert
         * @attribute closeAction
         * @type String
         * @default 'hide'
         */

        /**
         * Get / Set the action to take when the close button is clicked
         *
         * @method closeAction
         * @param {String} [action] Two values are allowed:
         *                          <ul>
         *                              <li><a href="#">hide<a/> : The Alery will be available to be redisplayed via the show method.
         *                              <li>
         *                                  <a href="">remove</a> : Remove the Alert from the DOM and destroy it and all descendant Components.
         *                                  The Alert will not be available to be redisplayed via the show method.
         *                              </li>
         *                          </ul>
         * @return {String|jB.Alert}
         * <ul>
         *   <li>String: The current close action type.
         *   <li>jB.Alert: this
         * </ul>
         */
        ,closeAction: function(action) {
            if (!arguments.length) {
                return this.$closeAction
            }

            this.$closeAction = action
            return this
        }

        /**
         * Enable / Disable the close button
         *
         * @attribute closable
         * @type Boolean
         * @default false
         */

        /**
         * Enable / Disable the 'close' button and allow the user to close the Alert.
         *
         * @method closable
         * @param {Boolean} [state] false to hide the 'close' button.
         * @return {Boolean|jB.Alert}
         *  <ul>
         *      <li>Boolean: The closable state
         *      <li>jB.Alert: this
         *  </ul>
         */
        ,closable: function(state) {
            if (!arguments.length) {
                return this.$closable
            }

            if (state) {
                if (!this.$closeCmp) {
                    var me = this
                    this.$closeCmp = jB.Component({
                        el: '<button>'
                        ,cls: 'close'
                        ,text: '×'
                        ,attr: {
                            type: 'button'
                        }
                        ,click: function() {
                            me.close()
                        }
                    })
                    this.prepend(this.$closeCmp)
                } else {
                    this.$closeCmp.show()
                }
            } else if (this.$closeCmp) {
                this.$closeCmp.hide()
            }

            this.$closable = state
            return this
        }


        /**
         * The alert type
         *
         * @attribute type
         * @type String
         * @default warning
         */

        /**
         * Get / Set the Alert type.
         *
         * @method type
         * @param {String} [type] Five values are allowed:
         *        <code>info</code> <code>warning</code> <code>success</code> <code>error</code> <code>danger</code>
         * @return {String|jB.Alert}
         *  <ul>
         *      <li>String: The Alert type
         *      <li>jB.Alert: this
         *  </ul>
         */
        ,type: function(type) {
            if (!arguments.length) {
                return this.$type
            }

            this.removeClass('alert-info alert-success alert-error alert-danger')
                .cls('alert-' + type)

            this.$type = type
            return this
        }

        /**
         * True to increase hte padding on the top and bottom of the alert wrapper.
         *
         * @attribute block
         * @type Boolean
         * @default false
         */

        /**
         * Enable / Disable increase the padding on the top and bottom of the alert wrapper.
         *
         * @method block
         * @param {Boolean} [state]
         * @return {Boolean|jB.Alert}
         *  <ul>
         *      <li>Boolean: The block state
         *      <li>jB.Alert: this
         *  </ul>
         */
        ,block: function(state) {
            if (!arguments.length) {
                return this.$block
            }

            this.toggleClass('alert-block', state)
            this.$block = state
            return this
        }

        /**
         * True to hide the alert when rendered.
         *
         * @attribute hidden
         * @type Boolean
         * @default false
         */

        /**
         * Get / Set the alert hidden state
         *
         * @method hidden
         * @param {Boolean} [state]
         * @return {Boolean|jB.Alert}
         * <ul>
         *   <li>Boolean: The hidden state.
         *   <li>jB.Alert: this
         * </ul>
         */
        ,hidden: function(state) {
            if (!state) {
                return this.$hidden
            }

            return this.toggle(!state)
        }

        /**
         * Fires before the alert is shown
         *
         * @event show
         * @param {jQuery.Event} e
         */

        /**
         * Fires before the alert is hidden
         *
         * @event hide
         * @param {jQuery.Event} e
         */

        /**
         * Fires when the alert is shown
         *
         * @event shown
         * @param {jQuery.Event} e
         */

        /**
         * Fires when the alert is hidden
         *
         * @event hidden
         * @param {jQuery.Event} e
         */

        /**
         * Toggle show / hide the alert
         *
         * @method toggle
         * @param {Boolean} [state]
         * @return {jB.Alert}
         */
        ,toggle: function(state) {
            if (!arguments.length) {
                state = this.hidden()
            }

            var dfd = jB.$.Deferred()
                ,event = jB.$.Event(state? 'show' : 'hide')

            this.trigger(event)
            if (event.isDefaultPrevented()) {
                ddf.resolve()
                return this
            }

            this.$hidden = !state

            if (!this.$animation) {
                this.el.toggle(state)
                dfd.resolve()
                return this
            }

            var me = this
                ,animationOption = this.$animation

            if ('string' == typeof animationOption) {
                animationOption = animationMap[this.$animation][state? 'show' : 'hide']
            }

            return this.animate(animationOption, function() {
                me.trigger(state? 'shown' : 'hidden')
            })
        }

        /**
         * Show this Alert.
         *
         * @method show
         * @return {jB.Alert}
         */
        ,show: function() {
            return this.toggle(true)
        }

        /**
         * Hide the Alert.
         * @method hide
         * @return {jB.Alert}
         */
        ,hide: function() {
            return this.toggle(false)
        }

        /**
         * Fires before the alert is close
         * @event close
         */

        /**
         * Fires when the alert is closed
         * @event closed
         */

        /**
         * Close the Alert.
         * By default, this method removes it from the DOM, destroys the Alert object and all its descendant Components.
         * The <a href="#">close</a> event is triggered.<br>
         * <em><b>Note</b>: This method is also affected by the <a href="#">closeAction</a> setting</em>
         *
         * @method close
         * @return {jB.Alert}
         */
        ,close: function() {
            var event = jB.$.Event('close')
            this.trigger(event)

            if (event.isDefaultPrevented()) {
                return this
            }

            var me = this
            return this.hide().done(function() {
                me.trigger('closed')
                if ('remove' == me.$closeAction) {
                    me.remove()
                }
            })
        }
    })
})()