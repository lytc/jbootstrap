//= require ./Group

/**
 * @example
 * jB.button.Menu({
 *     button: 'Action'
 *     ,menu: [
 *         {
 *             text: 'Item 1'
 *             ,href: 'http://google.com'
 *         },{
 *             text: 'Item 2'
 *         },'-',{
 *             text: 'Item 3'
 *         }
 *     ]
 *     ,css: {
 *         margin: '100px 0 0 100px'
 *     }
 *
 * //    ,button: {
 * //        text: 'Action'
 * //        ,icon: 'heart'
 * //        ,type: 'primary'
 * //    }
 * //    ,dropUp: true
 * //    ,menuAlign: 'right'
 * })

 * @class jB.button.Menu
 * @alias button.menu
 * @extends jB.button.Group
 */
jB.button.Group.extend('jB.button.Menu button.menu', {
    onRender: function() {
        this.buttonCmp()
    }

    /**
     * Get the button handler component
     *
     * @method buttonCmp
     * @return {jB.Button}
     */
    ,buttonCmp: function() {
        if (!this.$buttonCmp) {
            var me = this
            this.$buttonCmp = jB.Button({
                el: '<button class="dropdown-toggle"><span class="caret"></span></button>'
                ,click: function() {
                    me.toggle()
                }
            })

            this.prepend(this.$buttonCmp)
        }

        return this.$buttonCmp
    }

    /**
     * The options apply to button handler.
     * <ul>
     *     <li>String: The button text
     *     <li>Object: The button options
     *     <li>jB.Button: A instanceof jB.Button
     * </ul>
     *
     * @attribute button
     * @type String|Object|jB.Button
     */

    /**
     * Get / Set the button handler.
     *
     * @method button
     * @param {String|Object|jB.Button} [button]
     *  <ul>
     *    <li>String: The button text
     *    <li>Object: The button options
     *    <li>jB.Button: A instanceof jB.Button
     *  </ul>
     * @return {jB.Button|jB.button.Menu}
     * <ul>
     *     <li>jB.Button: If no argument provide, returns the button handler component.
     *     <li>jB.button.Menu: this
     * </ul>
     */
    ,button: function(options) {
        if (!arguments.length) {
            return this.buttonCmp()
        }

        if (options instanceof jB.Button) {
            !this.$buttonCmp || this.$buttonCmp.remove()
            this.$buttonCmp = options
            return this
        }

        if ('string' == typeof options) {
            options = {text: options}
        }

        this.buttonCmp().options(options)
        return this
    }

    /**
     * Get the menu component.
     *
     * @method menuCmp
     * @return {jB.Menu}
     */
    ,menuCmp: function() {
        if (!this.$menuCmp) {
            this.$menuCmp = jB.Menu()
            this.append(this.$menuCmp)
        }
        return this.$menuCmp
    }

    /**
     * The options apply to the menu of this button menu.
     *
     * <ul>
     *     <li>Object: The plain object as the menu options
     *     <li>Array: A list of menu item options of the menu.
     *     <li>jB.Menu: A instanceof jB.Menu
     * </ul>
     *
     * @attribute menu
     * @type Object|Array|jB.Menu
     */

    /**
     * Get / Set the menu of this button menu.
     *
     * @method menu
     * @param {Object|Array|jB.Menu} [options]
     * @return {jB.Menu|jB.button.Menu}
     * <ul>
     *     <li>jB.Menu: If no argument provide, returns the menu component.
     *     <li>jB.button.Menu: this
     * </ul>
     */
    ,menu: function(options) {
        if (!arguments.length) {
            return this.menuCmp()
        }

        if (options instanceof jB.Menu) {
            !this.$menuCmp || this.$menuCmp.remove()
            this.$menuCmp = options
            return this
        }

        if (jB.$.isArray(options)) {
            options = {items: options}
        }

        this.menuCmp().options(options)

        return this
    }

    /**
     * The menu alignment. Two value are allowed: <code>left</code>, <code>right</code>
     *
     * @attribute menuAlign
     * @type String
     */

    /**
     * Get / Set the menu alignment.
     *
     * @method menuAlign
     * @param {String} align Two value are allowed: <code>left</code>, <code>right</code>
     * @return {String|jB.button.Menu}
     * <ul>
     *     <li>String: If no argument provide, return the current alignment.
     *     <li>jB.button.Menu: this
     * </ul>
     */
    ,menuAlign: function(align) {
        if (!arguments.length) {
            return this.$menuAlign
        }

        this.menu().removeClass('pull-left pull-right').cls('pull-' + align)
        return this
    }

    /**
     * True to make the menu toggled from the bottom up, false otherwise.
     *
     * @attribute dropUp
     * @type Boolean
     * @default false
     */

    /**
     * Get / Set the the drop up state.
     *
     * @method dropUp
     * @param {Boolean} [state]
     * @return {Boolean|jB.button.Menu}
     * <ul>
     *     <li>Boolean: True if drop up is enabled, false otherwise.
     *     <li>jB.button.Menu: this
     * </ul>
     */
    ,dropUp: function(state) {
        if (!arguments.length) {
            return this.hasClass('dropup')
        }

        return this.toggleClass('dropup', state)
    }

    /**
     * Show the menu.
     *
     * @method show
     * @return {jB.button.Menu}
     */
    ,show: function() {
        return this.toggle(true)
    }

    /**
     * Hide the menu.
     *
     * @method hide
     * @return {jB.button.Menu}
     */
    ,hide: function() {
        return this.toggle(false)
    }

    /**
     * Fires before the menu toggle show/hide state.
     *
     * @event toggle
     * @param {Boolean} state True if it is shown, false if it is hidden.
     */

    /**
     * Fires before the menu is shown.
     *
     * @event show
     */

    /**
     * Fires before the menu is hidden.
     *
     * @event hide
     */

    /**
     * Fires when the menu is toggled show/hide.
     *
     * @event toggled
     * @param {Boolean} state True if it is shown, false if it is hidden.
     */

    /**
     * Fires when the menu is shown.
     *
     * @event shown
     *
     */

    /**
     * Fire when the menu is hidden.
     *
     * @event hidden
     */

    /**
     * Toggle show/hide the menu.
     *
     * @method toggle
     * @param {Boolean} [state]
     * @return {jB.button.Menu}
     */
    ,toggle: function(state) {
        var pressed = this.hasClass('open')

        arguments.length || (state = !pressed)

        if (pressed == state) {
            return this
        }

        var toggleEvent = jB.$.Event('toggle')
            ,stateEvent = jB.$.Event(state? 'show' : 'hide')

        this.trigger(toggleEvent, [state])
        this.trigger(stateEvent)

        if (toggleEvent.isDefaultPrevented() || stateEvent.isDefaultPrevented()) {
            return this
        }

        var me = this
            ,menu = this.menu()


        menu.toggle(state).done(function() {
            me.toggleClass('open')
            if (state) {
                jB.defer(function() {
                    var selector = jB.uniq('click.ns-')
                    jB.doc.on(selector, function() {
                        jB.doc.off(selector)
                        menu.hide().done(function() {
                            me.removeClass('open')
                        })
                    })
                })
            }
        })

        this.trigger('toggled', [state])
        this.trigger(state? 'shown' : 'hidden')
        return this
    }
})