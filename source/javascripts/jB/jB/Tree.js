//= require ./Component

/**
 * @example
 * jB.Tree({
 *     items: [
 *         {
 *             text: 'button'
 *             ,items: [
 *                 {
 *                     text: 'Group'
 *                 },{
 *                     text: 'Menu'
 *                 }
 *             ]
 *         },{
 *             text: 'Button'
 *         },{
 *             text: 'Menu'
 *         }
 *     ]
 * })
 *
 * @class jB.Tree
 * @alias tree
 * @extends jB.Component
 */
jB.Component.extend('jB.Tree tree', {
    $el: '<ul>'
    ,$cls: 'tree'
    ,$defaultItemType: 'tree.item'

    ,onRendered: function() {
        var me = this
        this.on('click', 'a', function() {
            if (!me.isRoot()) {
                return
            }

            var a = jB.get(this)
                ,treeItem = a.parent()

            me.trigger('select', treeItem)

            me.find(':jb-tree-item').removeClass('active')
            treeItem.cls('active')
        })
    }

    /**
     * True if it a root tree.
     *
     * @method isRoot
     * @return {Boolean}
     */
    ,isRoot: function() {
        return !this.parents(':jb-tree').length
    }
})