//= require ../../Component

/**
 * @class jB.form.field.AbstractField
 * @extends jB.Component
 */
jB.Component.extend('jB.form.field.AbstractField', {
    /**
     * The field name
     * @attribute name
     * @type String
     */

    /**
     * Get / Set the field name
     * @method name
     * @param {String} [name]
     * @return {String|jB.form.field.AbstractField}
     * <ul>
     *   <li>String: The field name
     *   <li>jB.form.field.AbstractField: this
     * </ul>
     */
    name: function(name) {
        return arguments.length? this.attr('name', name) : this.attr('name')
    }

    /**
     * The field place holder
     * @attribute placeHolder
     * @type String
     */

    /**
     * Get / Set the field place holder
     * @method placeHolder
     * @param {String} [placeHolder]
     * @return {String|jB.form.field.AbstractField}
     * <ul>
     *   <li>String: The field place holder
     *   <li>jB.form.field.AbstractField: this
     * </ul>
     */
    ,placeHolder: function(placeHolder) {
        return arguments.length? this.attr('placeholder', placeHolder) : this.attr('placeholder')
    }

    /**
     * The relative sizing of this field. Six values are allowed:
     * <code>mini</code>, <code>small</code>, <code>medium</code>,
     * <code>large</code>, <code>xlarge</code>, <code>xxlarge</code>
     *
     * @attribute size
     * @type String
     *
     * @example
     * jB.form.field.Text({
     *     size: 'large'
     * })
     */

    /**
     * Get / Set the relative sizing of this field
     *
     * @method size
     * @param {String} [size] Six values are allowed:
     *                        <code>mini</code>, <code>small</code>, <code>medium</code>,
     *                        <code>large</code>, <code>xlarge</code>, <code>xxlarge</code>
     * @return {String|jB.form.field.AbstractField}
     * <ul>
     *   <li>String: If no argument provide, returns the current size
     *   <li>jB.form.field.AbstractField: this
     * </ul>
     */
    ,size: function(size) {
        if (!arguments.length) {
            return this.$size
        }

        this.$size = size
        return this.removeClass('input-mini small medium large xlarge xxlarge'.split(' ').join('input-'))
            .addClass('input-' + size)
    }

    /**
     * True to make field behave like a block level element
     *
     * @attribute blockLevel
     * @type Boolean
     * @default false
     *
     * @example
     * jB.form.field.Text({
     *     blockLevel: true
     * })
     */

    /**
     * @method blockLevel
     * @param {Boolean} [state]
     * @return {Boolean|jB.form.field.AbstractField}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the block level state
     *   <li>jB.form.field.AbstractField: this
     * </ul>
     */
    ,blockLevel: function(state) {
        if (!arguments.length) {
            return this.hasClass('input-block-level')
        }

        return this.toggleClass('input-block-level', state)
    }

    /**
     * True if this field is required
     *
     * @attribute required
     * @type Boolean
     * @default false
     *
     * @example
     * jB.form.field.Text({
     *     required: true
     *     ,placeHolder: 'Focus me...'
     * })
     */

    /**
     * Get / Set required state
     *
     * @method required
     * @param {Boolean} [state]
     * @return {Boolean|jB.form.field.AbstractField}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the required state
     *   <li>jB.form.field.AbstractField: this
     * </ul>
     */
    ,required: function(state) {
        if (!arguments.length) {
            return this.hasAttribute('required')
        }

        return this.attr('required', state? 'required' : null)
    }
})