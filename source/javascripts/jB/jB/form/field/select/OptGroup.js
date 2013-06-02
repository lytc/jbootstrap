//= require ../../../Component

/**
 * @class jB.form.field.select.OptGroup
 * @alias select.optgroup
 * @extends jB.Component
 */
jB.Component.extend('jB.form.field.select.OptGroup select.optgroup', {
    $el: '<optgroup>'
    ,$defaultItemType: 'select.option'

    /**
     * The option group label
     * @attribute label
     * @type String
     */

    /**
     * Get / Set the option group label
     *
     * @method label
     * @param {String} label
     * @return {String|jB.form.field.select.OptGroup}
     * <ul>
     *   <li>String: The option group label
     *   <li>jB.form.field.select.OptGroup: this
     * </ul>
     */
    ,label: function(label) {
        if (!arguments.length) {
            return this.attr('label')
        }

        return this.attr('label', label)
    }

    /**
     * The option items of this option group
     * @attribute items
     * @type Array
     */

    /**
     * Set option items of this option group
     * @method items
     * @param {Array} items
     * @return {jB.form.field.select.OptGroup}
     */
    ,items: function(items) {
        for (var i = 0, len = items.length; i < len; ++i) {
            if (jB.$.isArray(items[i])) {
                items[i] = {
                    val: items[i][0]
                    ,text: items[i][1]
                }
            } else if (!jB.$.isPlainObject(items[i])) {
                items[i] = {
                    val: items[i]
                    ,text: items[i]
                }
            }
        }
        
        return this.callSuper('items', [items])
    }
})