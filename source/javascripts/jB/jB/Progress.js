//= require ./Component
/**
 * @example
 *
 * var progress = jB.Progress({
 *     percentage: 50
 *     ,striped: true
 *     ,animated: true
 * })
 *
 * var btn = jB.Button({
 *     text: 'Run'
 *     ,togglable: true
 *     ,css: {
 *         marginBottom: 10
 *     }
 *     ,on: {
 *         toggle: function(e, pressed) {
 *             progress[pressed? 'start' : 'stop']()
 *         }
 *     }
 * })

 *
 * ;[btn, progress]
 *
 * @class jB.Progress
 * @alias progress
 * @extends jB.Component
 */
jB.Component.extend('jB.Progress progress', {
    $cls: 'progress'
    ,$duration: 5

    /**
     * Get progress bar component.
     *
     * @method getBarCmp
     * @return {jB.Component}
     */
    ,getBarCmp: function() {
        if (!this.$barCmp) {
            this.$barCmp = jB.Component({
                cls: 'bar'
            })

            this.append(this.$barCmp)
        }

        return this.$barCmp
    }

    /**
     * The % width of this progress bar.
     *
     * @attribute percentage
     * @type Number
     *
     */

    /**
     * Get / Set the % width of this progress bar.
     *
     * @method percentage
     * @param {Number} [percentage]
     * @return {Number|jB.Progress}
     * <ul>
     *   <li>Number: If no argument provide, returns the % width of the progress bar.
     *   <li>jB.Progress: this
     * </ul>
     */
    ,percentage: function(percentage) {
        if (!arguments.length) {
            percentage = parseFloat(this.getBarCmp().css('width'))
            return isNaN(percentage)? 0 :percentage
        }

        this.getBarCmp().width(percentage + '%')
        return this
    }

    /**
     * Enable / Disable striped affect.
     *
     * @attribute striped
     * @type Boolean
     */

    /**
     * Enable / Disable striped affect.
     *
     * @method striped
     * @param {Boolean} [state]
     * @return {Boolean|jB.Progress}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the striped state.
     *   <li>jB.Progress: this
     * </ul>
     */
    ,striped: function(state) {
        if (!arguments.length) {
            return this.hasClass('progress-striped')
        }

        return this.toggleClass('progress-striped', state)
    }

    /**
     * True to start enable animate the stripes right to left.
     *
     * @attribute animated
     * @type Boolean
     * @default false
     */

    /**
     * Start / Stop animate the stripes
     * .
     * @method animated
     * @param {Boolean} [state]
     * @return {Boolean|jB.Progress}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the animated state.
     *   <li>jB.Progress: this
     * </ul>
     *
     */
    ,animated: function(state) {
        if (!arguments.length) {
            return this.hasClass('active')
        }

        return this.toggleClass('active', state)
    }

    /**
     * The progress style.
     *
     * @attribute type
     * @type String
     * @default 'primary'
     */

    /**
     * Get / Set the progress styles.
     *
     * @method type
     * @param {String} [type]
     * @return {String|jB.Progress}
     * <ul>
     *   <li>String: If no argument provide, returns the progress type.
     *   <li>jB.Progress: this
     * </ul>
     */
    ,type: function(type) {
        if (!arguments.length) {
            return this.$type
        }

        var types = ['primary', 'info', 'success', 'warning', 'danger', 'error', 'inverse']

        this.removeClass(types.map(function(type) {
            return 'progress-' + type
        }).join(' ')).cls('progress-' + type)

        this.$type = type
        return this
    }

    /**
     * The length of time in seconds that the progress bar should run to end (100%).
     *
     * @property duration
     * @type Number
     * @default 5
     */

    /**
     * Get / Set the length of time in seconds that the progress bar should run to end (100%).
     *
     * @method duration
     * @param {Number} [seconds]
     * @return {Number|jB.Progress}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the duration number.
     *   <li>jB.Progress: this
     * </ul>
     */
    ,duration: function(seconds) {
        if (!arguments.length) {
            return this.$duration
        }

        this.$duration = seconds
        return this
    }

    /**
     * Start running progress.
     *
     * @method start
     * @param {Object} [options]
     * @return {jB.Progress}
     */
    ,start: function(options) {
        options || (options = {})
        if ('number' == typeof options) {
            options = {duration: options}
        } else if ('function' == typeof options) {
            options = {callback: options}
        }
        options.duration || (options.duration = this.$duration)

        var me = this
            ,properties = {width: '100%'}

        me.cls('active')

        this.getBarCmp().el.width(0).animate(properties, options.duration * 1000, options.easing || 'linear', function() {
            me.removeClass('active')
            me.trigger('end')
            !options.callback || options.callback()
        })
        return this
    }

    /**
     * Stop progress.
     *
     * @method stop
     * @param {Function} [callback]
     * @return {jB.Progress}
     */
    ,stop: function(callback) {
        this.removeClass('active')
        this.getBarCmp().el.stop()
        this.trigger('stop')
        !callback || callback()

        return this
    }
})