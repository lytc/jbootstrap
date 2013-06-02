//= require ./Menu


/**
 * @example
 * jB.Nav({
 *    type: 'tabs'
 *    ,items: [
 *        {
 *            text: 'Item 1'
 *            ,activated: true
 *        },{
 *            text: 'Item 2'
 *        },{
 *            text: 'Item 3'
 *        }
 *    ]
 *})

 * @class jB.Nav
 * @alias nav
 * @extends jB.Menu
 */

jB.Menu.extend('jB.Nav nav', {
    $cls: 'nav'

    /**
     * The nav type.
     *
     * @attribute type
     * @type String
     */

    /**
     * Get / Set the nav type.
     *
     * @method type
     * @param {String} [type]
     * @return {String|jB.Nav}
     * <ul>
     *   <li>String: If no argument provide, return the current nav type.
     *   <li>jB.Nav: this
     * </ul>
     */
    ,type: function(type) {
        if (!arguments.length) {
            return this.$type
        }

        return this.removeClass('nav-tabs nav-pills nav-list').cls('nav-' + type)
    }

    /**
     * Enable / Disabled stacked mode
     *
     * @attribute stacked
     * @type Boolean
     * @default false
     */

    /**
     * Get / Set stacked mode
     *
     * @method stacked
     * @param {Boolean} state
     * @return {Boolean|jB.Nav}
     * <ul>
     *   <li>String: If no argument provide, return the stacked state.
     *   <li>jB.Nav: this
     * </ul>
     */
    ,stacked: function(state) {
        if (!arguments.length) {
            return this.hasClass('nav-stacked')
        }

        return this.toggleClass('nav-stacked', state)
    }
});