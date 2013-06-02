//= require ./AbstractField

/**
 * @class jB.form.field.Select
 * @alias select
 * @extends jB.form.field.AbstractField
 *
 * @example
 * jB.form.field.Select([1, 2, 3, 4])
 *
 * @example
 * jB.form.field.Select([
 *     [1, 'item 1'],
 *     [2, 'item 2'],
 *     [3, 'item 3'],
 *     [4, 'item 4']
 * ])
 *
 * @example
 * jB.form.field.Select({
 *     items: {
 *         1: 'item 1'
 *         ,2: 'item 2'
 *         ,3: 'item 3'
 *         ,4: 'item 4'
 *     }
 *     ,multiple: true
 * })
 *
 * @example
 * jB.form.field.Select({
 *     items: {
 *         'Group 1': [1, 2, 3]
 *         ,'Group 2': [3, 4, 5]
 *         ,3: 'item 3'
 *         ,'Group 4': [6, 7, 8]
 *     }
 * })
 *
 * @example
 * jB.form.field.Select([
 *     {
 *         text: 'Group 1'
 *         ,val: [1, 2, 3]
 *     },{
 *         text: 'Group 2'
 *         ,val: [4, 5, 6]
 *     }
 * ])
 */
jB.form.field.AbstractField.extend('jB.form.field.Select select', {
    $el: '<select>'
    ,$defaultItemType: 'select.option'

    /**
     * True to show multiple option at once
     *
     * @attribute multiple
     * @type Boolean
     * @default false
     */

    /**
     * Get / Set multiple option state
     *
     * @method multiple
     * @param {Boolean} [state]
     * @return {Boolean|jB.form.field.Select}
     * <ul>
     *   <li>Boolean: If no argument provide, returns the multiple options state
     *   <li>jB.form.field.Select: this
     * </ul>
     */
    ,multiple: function(state) {
        if (!arguments.length) {
            return this.hasAttribute('multiple')
        }

        return this.attr('multiple', state? 'multiple' : null)
    }

    /**
     * The option/option-group items of this option group
     * @attribute items
     * @type Array
     */

    /**
     * Set option/option-group items of this option group
     * @method items
     * @param {Object|Array} items
     * @return {jB.form.field.Select}
     */
    ,items: function(items) {
        if (jB.$.isArray(items)) {
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

                if (jB.$.isArray(items[i].val)) {
                    items[i] = {
                        xtype: 'select.optgroup'
                        ,label: items[i].text
                        ,items: items[i].val
                    }
                }
            }    
        } else {
            var tmp = []
            for (var i in items) {
                if (jB.$.isArray(items[i])) {
                    tmp.push({
                        xtype: 'select.optgroup'
                        ,label: i
                        ,items: items[i]
                    })
                } else {
                    tmp.push({
                        val: i
                        ,text: items[i]
                    })
                }
            }

            items = tmp
        }
        
        return this.callSuper('items', [items])
    }
})