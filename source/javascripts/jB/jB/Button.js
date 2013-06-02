//= require ./Component

/**
 * @example
 * jB.Button({
 *     text: 'Button',
 *     //type: 'primary',    // primary|info|success|warning|danger|inverse|link
 *     //size: 'large',      // mini|small|large
 *     //disabled: true,     // true|false
 *     //pressed: true,      // true|false
 *     //togglable: true,    // true|false
 *     //block: true,        // true|false
 *     //icon: 'glass',      // jB.Icon.type|jB.Icon.options
 *     //iconAlign: 'right', // left|right
 *     click: function() {
 *         alert('Hi!')
 *     }
 * })
 *
 * @class jB.Button
 * @alias button
 * @extends jB.Component
 *
 */
jB.Component.extend('jB.Button button', {
    /**
     * @protected
     * @property $el
     */
    $el: '<button>'

    /**
     * @protected
     * @property $cls
     * @default 'btn'
     */
    ,$cls: 'btn'

    /**
     * @protected
     * @property $iconAlign
     * @default 'left'
     */
    ,$iconAlign: 'left'

    /**
     * @protected
     * @property $togglable
     * @type Boolean
     * @default false
     */
    ,$togglable: false

    /**
     * The button type.
     * Seven values are allowed:
     * <code>primary</code> <code>info</code> <code>success</code> <code>warning</code> <code>danger</code>
     * <code>inverse</code> <code>link</code>
     *
     * @attribute type
     * @type String
     */

    /**
     * Set the Button type.
     * Seven values are allowed:
     * <code>primary</code> <code>info</code> <code>success</code> <code>warning</code> <code>danger</code>
     * <code>inverse</code> <code>link</code>
     *
     * @method type
     * @param {String} [type]
     * @return {String|jB.Button}
     * <ul>
     *   <li>String: If no argument provide, returns the current button type.
     *   <li>jB.Button: this
     * </ul>
     */
    ,type: function(type) {
        if (arguments.length == 0) {
            return this.$type
        }

        var types = ['primary', 'info', 'success', 'warning', 'danger', 'error', 'inverse', 'link']

        this.removeClass(types.map(function(type) {
            return 'btn-' + type
        }).join(' '))

        this.cls(this.cls() + ' btn-' + type)
        this.$type = type

        return this
    }

    /**
     * The button text
     *
     * @attribute text
     * @type String
     */

    /**
     * Set the button text or get the button text component
     *
     * @method text
     * @param {String} [text]
     * @return {jB.Component|jB.Button}
     * <ul>
     *     <li>jB.Component: If no argument provide, return the menu item text component.
     *     <li>jB.Button: this
     * </ul>
     */
    ,text: function(text) {
        if (!arguments.length) {
            return this.$textCmp
        }
        this.textCmp().text(text)
        return this
    }

    /**
     * Get the button text component.
     *
     * @method textCmp
     * @return {jB.Component}
     */
    ,textCmp: function() {
        if (!this.$textCmp) {
            this.$textCmp = jB('<span class="x-text"></span>')
            this.prepend(this.$textCmp)
            this.iconAlign(this.$iconAlign)
        }

        return this.$textCmp
    }

    /**
     * The button size.
     * Three values are allowed: <code>mini</code> <code>small</code> <code>large</code>
     *
     * @attribute size
     * @type String
     */

    /**
     * Set the Button size. Three values are allowed: <code>mini</code> <code>small</code> <code>large</code>
     *
     * @method size
     * @param {String} [size]
     * @return {String|jB.Button}
     * <ul>
     *   <li>String: If no argument provide, returns the current button size.
     *   <li>jB.Button: this
     * </ul>
     */
    ,size: function(size) {
        if (!arguments.length) {
            return this.$size
        }

        var sizes = ['mini', 'small', 'large']

        this.removeClass(sizes.map(function(size) {
            return 'btn-' + size
        }).join(' '))

        this.cls(this.cls() + ' btn-' + size)
        this.$size = size

        return this
    }

    /**
     * True to render this button pressed.
     *
     * @attribute pressed
     * @type Boolean
     * @default false
     */

    /**
     * Toggle the Button pressed state.
     *
     * @method pressed
     * @param {Boolean} [state]
     * @return {Boolean|jB.Button}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the pressed state.
     *   <li>jB.Button: this
     * </ul>
     */
    ,pressed: function(state) {
        if (!arguments.length) {
            return this.hasClass('active')
        }

        return this.toggle(state)
    }

    /**
     * Enable / Disable togglable mode.
     *
     * @attribute togglable
     * @type Boolean
     * @default false
     */

    /**
     * Switch the Button to togglable mode.
     *
     * @method togglable
     * @param {Boolean} [state]
     * @return {Boolean|jB.Button}
     * <ul>
     *   <li>Boolean: If no argument provide, returns togglable state.
     *   <li>jB.Button: this
     * </ul>
     */
    ,togglable: function(state) {
        if (!arguments.length) {
            return this.$togglable
        }

        if (state == this.$togglable) {
            return this
        }

        if (state) {
            var me = this.on('click.toggle', function() {
                me.toggle()
            })
        } else {
            this.off('click.toggle')
        }

        return this
    }

    /**
     * Enable / Disable block mode.
     *
     * @attribute block
     * @type Boolean
     * @default false
     */

    /**
     * Switch mode of span the Button to the full with of it parent.
     *
     * @method block
     * @param {Boolean} [state]
     * @return {Boolean|jB.Button}
     * <ul>
     *   <li>Boolean: If no argument provide, returns block mode state.
     *   <li>jB.Button: this
     * </ul>
     */
    ,block: function(state) {
        if (!arguments.length) {
            return this.hasClass('btn-block')
        }

        return this.toggleClass('btn-block', state)
    }

    /**
     * The button icon.
     * <ul>
     *   <li>String: Type of the Icon
     *   <li>Object: The options apply to this Icon
     *   <li>jB.Icon: A instanceof jB.Icon
     * </ul>
     *
     * @attribute icon
     * @type String|Object|jB.Icon
     *
     */

    /**
     * Get / Set icon for this Button.
     *
     * @method icon
     * @param {String|Object|jB.Icon} [options]
     *   <ul>
     *     <li>String: Type of the Icon
     *     <li>Object: The options apply to this Icon
     *     <li>jB.Icon: A instanceof jB.Icon
     *   </ul>
     * @return {jB.Icon|jB.Button}
     * <ul>
     *   <li>jB.Icon: If no argument provide, returns the Icon component instance.
     *   <li>jB.Button: this
     * </ul>
     */
    ,icon: function(options) {
        if (!arguments.length) {
            return this.$iconCmp
        }

        if (options instanceof jB.Icon) {
            if (this.$iconCmp) {
                this.$iconCmp.remove()
            }

            this.$iconCmp = jB.Icon
            this.prepend(this.$iconCmp)
            return this

        }

        if ('string' == typeof options) {
            options = {type: options}
        }

        this.iconCmp().options(options)
        return this
    }

    /**
     * Get the button icon component.
     *
     * @method iconCmp
     * @return {jB.Icon}
     */
    ,iconCmp: function() {
        if (!this.$iconCmp) {
            this.$iconCmp = jB.Icon()
            this.prepend(this.$iconCmp)
            this.iconAlign(this.$iconAlign)
        }

        return this.$iconCmp
    }

    /**
     * The button icon alignment.
     *
     * @attribute iconAlign
     * @type String
     * @default 'left'
     */

    /**
     * Change the Icon alignment. Two values are allowed: <code>left</code> <code>right</code>
     *
     * @method iconAlign
     * @param {String} [align]
     * @return {String|jB.Button}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the icon alignment type.
     *   <li>jB.Button: this
     * </ul>
     */
    ,iconAlign: function(align) {
        if (!arguments.length) {
            return this.$iconAlign
        }

        this.$iconAlign = align
        if (this.$iconCmp && this.$textCmp) {
            this[this.$iconAlign == 'left'? 'prepend' : 'append'](this.iconCmp())
        }

        return this
    }

    /**
     * Toggle or set the pressed state of this Button.
     *
     * @method toggle
     * @param {Boolean} [state] If a state it passed, it becomes the pressed state otherwise the current state is toggled.
     * @return {jB.Button}
     */

    /**
     * Fires before the 'pressed' state of this button changes.
     *
     * @event toggle
     * @param {Boolean} pressed
     */

    /**
     * Fires when the 'pressed' state of this button changed.
     *
     * @event toggled
     * @param {Boolean} pressed
     */

    ,toggle: function(state) {
        var pressed = this.pressed()
        arguments.length || (state = !pressed)

        if (state == pressed) {
            return this
        }

        var event = jB.Event('toggle')
        this.trigger(event, [state])

        if (event.isDefaultPrevented()) {
            return this
        }

        return this.toggleClass('active', state)
                    .trigger('toggled', [state])
    }
})