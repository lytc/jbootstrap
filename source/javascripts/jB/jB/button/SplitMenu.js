//= require ./Menu

/**
 * @example
 * jB.button.SplitMenu({
 *     text: 'Action'
 *     ,menu: [
 *         {
 *             text: 'Item 1'
 *             ,href: 'http://google.com'
 *         },{
 *             text: 'Item 2'
 *         },'-',{
 *             text: 'Item 3'
 *         }
 *     ]
 *     ,css: {
 *         margin: '100px 0 0 100px'
 *     }
 *
 * //    ,dropUp: true
 * //    ,menuAlign: 'right'
 * })
 * @class jB.button.SplitMenu
 * @alias button.splitmenu
 * @extends jB.button.Menu
 */
jB.button.Menu.extend('jB.button.SplitMenu button.splitmenu', {
    onRender: function() {
        this.callSuper(arguments)
        this.prepend(this.$primaryButtonCmp)
    }

    /**
     * Get primary button component
     *
     * @method primaryButtonCmp
     * @return {jB.Button}
     */
    ,primaryButtonCmp: function() {
        if (!this.$primaryButtonCmp) {
            this.$primaryButtonCmp = jB.Button()
            this.prepend(this.$primaryButtonCmp)
        }

        return this.$primaryButtonCmp
    }
})

jB.$.each('text icon'.split(' '), function(index, method) {
    var primaryBtn
        ,result

    jB.button.SplitMenu.addMember(method, function() {
        primaryBtn = this.primaryButtonCmp()
        result = primaryBtn[method].apply(primaryBtn, arguments)
        return result == primaryBtn? this : result
    })
})