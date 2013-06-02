//= require ../Component

/**
 * @class jB.form.Controls
 * @alias form.controls
 * @extends jB.Component
 */
jB.Component.extend('jB.form.Controls form.controls', {
    $cls: 'controls'

    /**
     * The help text
     * <ul>
     *   <li>String: The help text/html
     *   <li>Object: The option apply to this help component
     * </ul>
     * @attribute help
     * @type String|Object
     */

    /**
     * @method help
     * @param {String|Object} [option] <ul>
     *                                   <li>String: The help text/html
     *                                   <li>Object: The option apply to this help component
     *                                 </ul>
     * @return {jB.form.HelpText|jB.form.Controls}
     * <ul>
     *   <li>jB.form.HelpText: If no argument provide, returns the help component
     *   <li>jB.form.Controls: this
     * </ul>
     */
    ,help: function(options) {
        if (!arguments.length) {
            return this.$helpCmp
        }

        if ('string' == typeof options) {
            options = {html: options}
        }

        this.helpCmp().options(options)
        return this
    }

    ,helpCmp: function() {
        if (!this.$helpCmp) {
            this.$helpCmp = jB.form.HelpText()
            this.append(this.$helpCmp)
        }
        return this.$helpCmp
    }
})