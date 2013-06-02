//= require ../Component

/**
 * @example
 * jB.button.Group({
 *     items: [
 *         {
 *             text: 'Btn 1'
 *         },{
 *             text: 'Btn 2'
 *         },{
 *             text: 'Btn 3'
 *         }
 *     ]
 * //    ,vertical: true
 * //    ,togglable: 'radio' // radio|checkbox
 * //    ,block: true
 * //    ,icon: 'heart'
 * //    ,iconAlign: 'right'
 * //    ,pressed: true
 * //    ,size: 'large'
 * //    ,text: 'btn text'
 * //    ,type: 'primary'
 * })
 *
 * @class jB.button.Group
 * @alias button.group
 * @extends jB.Component
 */
jB.Component.extend('jB.button.Group button.group', {
    $cls: 'btn-group'
    ,$defaultItemType: 'button'

    /**
     * True to make a set of buttons appear vertically stacked rather than horizontally, false otherwise.
     *
     * @attribute vertical
     * @type Boolean
     * @default false
     *
     */

    /**
     * Get /Set the vertical state.
     *
     * @method vertical
     * @param {Boolean} [state]
     * @return {Boolean|jB.button.Group}
     */
    ,vertical: function(state) {
        if (!arguments.length) {
            return this.hasClass('btn-group-vertical')
        }

        return this.toggleClass('btn-group-vertical', state)
    }

    /**
     * Set the button group as checkbox or radio flavors.
     * Two values are allowed:
     * <ul>
     *     <li><code>radio</code>: only one button may be active.
     *     <li><code>checkbox</code>: any number of buttons may be active.
     * </ul>
     *
     * @attribute togglable
     * @type String
     */

    /**
     * Set the button group as checkbox or radio flavors.
     *
     * @method toggleable
     * @param {String} type Two values are allowed:
     *      <ul>
     *          <li><code>radio</code>: only one button may be active.
     *          <li><code>checkbox</code>: any number of buttons may be active.
     *      </ul>
     *
     * @return {Boolean|jB.button.Group}
     * <ul>
     *     <li>Boolean: If no argument provide, it returns the current toggle type.
     *     <li>jB.button.Group: this
     * </ul>
     */
    ,togglable: function(type) {
        if (!arguments.length) {
            return this.$toggleType
        }

        if (!this.$togglableClickCallback) {
            this.$togglableClickCallback = function() {
                'checkbox' == type? jB.get(this).toggle() : jB.get(this).pressed(true)
            }
            this.on('click', '> :jb-button', this.$togglableClickCallback)
        }

        if (type == this.$toggleType) {
            return this
        }

        if (!this.$toggleableRadioCallback) {
            this.$toggleableRadioCallback = function(e, pressed) {
                if (pressed) {
                    jB(this).siblings(':jb-button').callEach('pressed', [false])
                }
            }
        }

        this['radio' == type? 'on' : 'off']('toggled', '> :jb-button', this.$toggleableRadioCallback)

        this.$toggleType = type
        return this
    }
})

/**
 * @attribute block
 * @see jB.Button.block
 */

/**
 * @attribute icon
 * @see jB.Button.icon
 */

/**
 * @attribute iconAlign
 * @see jB.Button.iconAlign
 */

/**
 * @attribute size
 * @see jB.Button.size
 */

/**
 * @attribute text
 * @see jB.Button.text
 */

/**
 * @attribute type
 * @see jB.Button.type
 */

/**
 * @attribute disabled
 * @see jB.Button.disabled
 */

/**
 * @see jB.Button.block
 * @method block
 * @return {Boolean|jB.button.Group}
 */

/**
 * @see jB.Button.icon
 * @method icon
 * @return {Boolean|jB.button.Group}
 */


/**
 * @see jB.Button.iconAlign
 * @method iconAlign
 * @return {String|jB.button.Group}
 */

/**
 * @see jB.Button.size
 * @method size
 * @return {String|jB.button.Group}
 */


/**
 * @see jB.Button.text
 * @method text
 * @return {String|jB.button.Group}
 */

/**
 * @see jB.Button.type
 * @method type
 * @return {String|jB.button.Group}
 */


/**
 * @see jB.Button.disabled
 * @method disabled
 * @return {Boolean|jB.button.Group}
 */

jB.$.each('block icon iconAlign size text type disabled'.split(' '), function(index, method) {
    jB.button.Group.addMember(method, function() {
        this.children(':jb-button').callEach(method, arguments)
        return this
    })
})