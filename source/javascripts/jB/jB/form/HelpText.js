//= require ../Component

/**
 * @class jB.form.HelpText
 * @alias helptext
 * @extends jB.Component
 */
jB.Component.extend('jB.form.HelpText helptext', {
    $el: '<span class="help-inline">'
    ,$layout: 'inline'

    /**
     * The help layout. Two values are allowed: <code>inline</code>, <code>block</code>
     * @attribute
     * @default 'inline'
     */

    /**
     * Get / Set the layout
     *
     * @method layout
     * @param {String} [layout] Two values are allowed: <code>inline</code>, <code>block</code>
     * @return {String|jB.form.HelpText}
     * <ul>
     *   <li>String: If no argument provide, return the current layout
     *   <li>jB.form.HelpText: this
     * </ul>
     */
    ,layout: function(layout) {
        if (!arguments.length) {
            return this.$layout
        }

        this.removeClass('help-' + this.$layout)
            .addClass('help-' + layout)

        this.$layout = layout
        return this
    }
})