//= require ./Component
/**
 * @example
 * jB.Icon({
 *     type: 'heart'
 * })
 *
 * @class jB.Icon
 * @alias icon
 * @extends jB.Component
 */

jB.Component.extend('jB.Icon icon', {
    /**
     * @protected
     * @property $el
     * @type String
     */
    $el: '<i>'

    /**
     * The icon type.
     *
     * @attribute type
     * @type String
     */


    /**
     * Get / Set the icon type.
     *
     * @method type
     * @param {String} [type]
     * @return {String|jB.Icon}
     * <ul>
     *   <li>String: If no argument provide, return the current icon type.
     *   <li>jB.Icon: this
     * </ul>
     */
    ,type: function(type) {
        if (!arguments.length) {
            return this.$type
        }

        this.removeClass('icon-' + this.$type).cls('icon-' + type)

        this.$type = type
        return this
    }

    /**
     * Enable / Disable inverted (white) icons.
     *
     * @attribute white
     * @type Boolean
     * @default false
     */

    /**
     * Enable / Disable inverted (white) icons.
     *
     * @method white
     * @param {Boolean} [state]
     * @return {Boolean|jB.Icon}
     * <ul>
     *   <li>Boolean: If no argument provide, return the inverse state.
     *   <li>jB.Icon: this
     * </ul>
     */
    ,white: function(state) {
        if (!arguments.length) {
            return this.hasClass('icon-white')
        }

        this.toggleClass('icon-white', state)
        return this
    }
})