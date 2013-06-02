//= require ../Component

/**
 * @class jB.form.Label
 * @alias label
 * @extends jB.Component
 *
 * @example
 * jB.form.Label({
 *     text: 'Email'
 *     ,field: {
 *         xtype: 'checkbox'
 *     }
 * })
 */
jB.Component.extend('jB.form.Label label', {
    $el: '<label>'

    /**
     * The label text/options
     * <ul>
     *   <li>String: The label text
     *   <li>Object: The options apply to this text component
     * </ul>
     * @attribute text
     * @type String|Object
     */

    /**
     * Get / Set the text component of this label
     * @method text
     * @param {String|Object} [options] <ul>
     *                                    <li>String: The label text
     *                                    <li>Object: The options apply to this text component
     *                                  </ul>
     * @return {jB.Component|jB.form.Label}
     */
    ,text: function(options) {
        if (!arguments.length) {
            return this.$textCmp
        }

        if ('string' == typeof options) {
            options = {text: options}
        }

        this.textCmp().options(options)
        return this
    }

    /**
     * Get text component instance
     *
     * @method textCmp
     * @return {jB.Component}
     */
    ,textCmp: function() {
        if (!this.$textCmp) {
            this.$textCmp = jB.Component('<span>')
            this.prepend(this.$textCmp)
        }

        return this.$textCmp
    }

    /**
     * The 'for' attribute of this label
     * <ul>
     *   <li>String: The id of the element the label is bound to
     *   <li>jB.form.field.AbstractField: The field the label is bound to
     * </ul>
     * @attribute for
     * @type String|jB.form.field.AbstractField
     */

    /**
     * Get / Set the 'for' attribute of this label
     * @method for
     * @param {String|jB.form.field.AbstractField} [field] <ul>
     *                                                 <li>String: The id of the element the label is bound to
     *                                                 <li>jB.form.field.AbstractField: The field the label is bound to
     *                                               </ul>
     * @return {String|jB.form.Label}
     * <ul>
     *   <li>String: The 'for' attribute value
     *   <li>jB.form.Label: this
     * </ul>
     */
    ,for: function(field) {
        if (!arguments.length) {
            return this.attr('for')
        }

        var id = field
        if (field instanceof jB.form.field.AbstractField) {
            id = field.id()
            if (!id) {
                id = jB.uniq('field-')
                field.id(id)
            }
        }

        return this.attr('for', id)
    }

    /**
     * The child field of this label
     * <ul>
     *   <li>Object: The options apply to the field
     *   <li>jB.form.field.AbstractField: A instanceof jB.form.field.AbstractField
     * </ul>
     *
     * @attribute field
     * @type Object|jB.form.field.AbstractField
     */

    /**
     * The child field of this label
     *
     * @method field
     * @param {Object|jB.form.field.AbstractField} [field] <ul>
     *                                                 <li>Object: The options apply to the field
     *                                                 <li>jB.form.field.AbstractField: A instanceof jB.form.field.AbstractField
     *                                               </ul>
     * @return {jB.form.field.AbstractField|jB.form.Label}
     * <ul>
     *   <li>jB.form.field.AbstractField: The field component instance
     *   <li>jB.form.Label: this
     * </ul>
     */
    ,field: function(field) {
        if (!arguments.length) {
            return this.$field
        }

        if (!(field instanceof jB.form.field.AbstractField)) {
            field = jB(field)
        }

        if (this.$textCmp) {
            this.$textCmp.after(field.el)
        } else {
            this.prepend(field)
        }

        this.$field = field

        if (field instanceof jB.form.field.Checkbox) {
            this.removeClass('radio').addClass('checkbox')
        } else if (field instanceof jB.form.field.Radio) {
            this.removeClass('checkbox').addClass('radio')
        }

        return this
    }

    /**
     * True to appear controls on the same line
     *
     * @attribute inline
     * @type Boolean
     * @default false
     * @example
     * jB.Component({
     *     defaults: {
     *         xtype: 'label'
     *         ,inline: true
     *         ,field: {
     *             xtype: 'checkbox'
     *         }
     *     }
     *     ,items: [
     *         {
     *             text: '1'
     *             ,field: {
     *                 val: 'option1'
     *             }
     *         },{
     *             text: '2'
     *             ,field: {
     *                 val: 'option1'
     *             }
     *         },{
     *             text: '3'
     *             ,field: {
     *                 val: 'option1'
     *             }
     *         }
     *     ]
     * })
     */

    /**
     * Get / Set the inline state
     *
     * @method inline
     * @param {Boolean} [state]
     * @return {Boolean|jB.form.Label}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the inline state
     *   <li>jB.form.Label: this
     * </ul>
     */
    ,inline: function(state) {
        if (!arguments.length) {
            return this.hasClass('inline')
        }

        this.toggleClass('inline', state)
    }
})