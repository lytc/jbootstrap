//= require ./Component
//= require ./accordion/Item

/**
 * @example
 * jB.Accordion({
 *     items: [
 *         {
 *             title: 'Item 1'
 *             ,body: 'Item 1 body'
 *         },{
 *             title: 'Item 2'
 *             ,body: 'Item 2 body'
 *         },{
 *             title: 'Item 3'
 *             ,body: 'Item 3 body'
 *         }
 *     ]
 * })
 *
 * @class jB.Accordion
 * @alias accordion
 * @extends jB.Component
 */
jB.Component.extend('jB.Accordion accordion', {
    $defaultItemType: 'accordion.item'
    ,$cls: 'accordion'

    ,$defaultOptions: function() {
        return {
            multiple: false
            ,defaults: {
                animation: true
            }
        }
    }

    /**
     * True to enable multiple accordion items to be open at once.
     *
     * @attribute multiple
     * @type Boolean
     * @default false
     */

    /**
     * Enable/disable multiple accordion items to be open at once.
     *
     * @example
     * jB.Accordion({
     *     multiple: true
     *     ,items: [
     *         {
     *             title: 'Item 1'
     *             ,body: 'Item 1 body'
     *         },{
     *             title: 'Item 2'
     *             ,body: 'Item 2 body'
     *         }
     *     ]
     * })
     * @method multiple
     * @param {Boolean} [state]
     * @return {Boolean|jB.Accordion}
     * <ul>
     *   <li>Boolean: The multiple state.
     *   <li>jB.Accordion: this
     * </ul>
     */
    ,multiple: function(state) {
        if (arguments.length == 0) {
            return this.$multiple
        }

        if (state) {
            this.off('expand.multiple', '> *')
        } else {
            this.on('expand.multiple', '> *', function() {
                jB.get(this).siblings(':jb-accordion-item').callEach('toggle', [false])
            })
        }

        this.$multiple = state
        return this
    }

    /**
     * Enable / Disable the accordion collapse animation
     *
     * @attribute animation
     * @type Boolean
     * @default true
     */

    /**
     * Get / Set the accordion animation state
     *
     * @method animation
     * @param {Boolean} [state]
     * @return {Boolean|jB.Accordion}
     * <ul>
     *   <li>Boolean: The animation state
     *   <li>jB.Accordion: this
     * </ul>
     */
    ,animation: function(state) {
        if (!arguments.length) {
            return this.$animation
        }

        this.$animation = state

        this.children(':jb-accordion-item').callEach('animation', [state])
        this.defaults('animation', state)

        return this
    }
})