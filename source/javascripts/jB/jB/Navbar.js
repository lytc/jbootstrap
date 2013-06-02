

/**
 * @example
 * jB.Navbar({
 *    brand: 'Title'
 *    ,collapsible: true
 *    ,items: [
 *        {
 *            xtype: 'navbar.nav'
 *            ,items: [
 *                {
 *                    text: 'Item 1'
 *                    ,menu: [
 *                    {
 *                        text: 'Item 11'
 *                    },{
 *                        text: 'Item 12'
 *                    }
 *                ]
 *                },'-',{
 *                    text: 'Item 2'
 *                    ,href: 'http://google.com'
 *                }
 *            ]
 *        },{
 *            xtype: 'form'
 *            ,layout: 'navbar-search'
 *            ,pullTo: 'right'
 *            ,items: {
 *                xtype: 'textfield'
 *                ,search: true
 *                ,size: 'small'
 *                ,placeHolder: 'Search...'
 *            }
 *        }
 *    ]
 *})

 * @class jB.Navbar
 * @alias navbar
 * @extends jB.Component
 */
jB.Component.extend('jB.Navbar navbar', {
    $cls: 'navbar'

    /**
     * Get inner component.
     *
     * @method innerCmp
     * @return {jB.Component}
     */
    ,innerCmp: function() {
        if (!this.$innerCmp) {
            this.$innerCmp = jB('<div class="navbar-inner"></div>')
            this.append(this.$innerCmp)
        }

        return this.$innerCmp
    }

    /**
     * Get container component.
     *
     * @method containerCmp
     * @return {jB.Component}
     */
    ,containerCmp: function() {
        if (!this.$containerCmp) {
            this.$containerCmp = jB.navbar.Container()
            this.innerCmp().append(this.$containerCmp)
        }
        return this.$containerCmp
    }

    /**
     * Get brand component.
     *
     * @method brandCmp
     * @return {jB.Component}
     */
    ,brandCmp: function() {
        if (!this.$brandCmp) {
            this.$brandCmp = jB('<a href="#" class="brand"></a>')
            this.containerCmp().prepend(this.$brandCmp)
        }

        return this.$brandCmp
    }

    /**
     * The brand of this navbar.
     * <ul>
     *   <li>String: The text/html apply to brand component.
     *   <li>Object: The options apply to brand component.
     * </ul>
     * @attribute brand
     * @type String|Object
     */

    /**
     * @method brand
     * @param {String|Object} options <ul>
     *                                  <li>String: The text/html apply to brand component.
     *                                  <li>Object: The options apply to brand component.
     *                                </ul>
     * @return {jB.Component|jB.Navbar}
     * <ul>
     *   <li>jB.Component: If no argument provide, returns the branch component instance.\
     *   <li>jB.Navbar: this
     * </ul>
     */
    ,brand: function(options) {
        if (!arguments.length) {
            return this.brandCmp()
        }

        if ('string' == typeof options) {
            options = {text: options}
        }

        this.brandCmp().options(options)
        return this
    }

    /**
     * @see jB.Component.items
     * @method items
     */
    ,items: function(items) {
        this.containerCmp().body(items)
    }

    /**
     * The nav component append to this Navbar.
     * <ul>
     *   <li>Object: The options apply to this nav
     *   <li>Array: List items apply to this nav
     *   <li>jB.Nav: A instanceof jB.Nav
     * </ul>
     * @attribute nav
     * @type Object|Array|jB.Nav
     */

    /**
     * @method nav
     * @param {Object|Array|jB.Nav} options <ul>
     *                                        <li>Object: The options apply to this nav
     *                                        <li>Array: List items apply to this nav
     *                                        <li>jB.Nav: A instanceof jB.Nav
     *                                      </ul>
     * @return {jB.Navbar}
     */
    ,nav: function(options) {
        options || (options = {})
        if (jB.$.isArray(options)) {
            options = {items: options}
        }
        if (!(options instanceof jB.navbar.Nav)) {
            options.xtype = 'navbar.nav'
        }

        return this.items(options)
    }

    /**
     * True to inverse the navbar style.
     * @attribute inverse
     */

    /**
     * Get the inverse state or enable/disable inverse state.
     *
     * @method inverse
     * @param {Boolean} [state]
     * @return {Boolean|jB.Navbar}
     * <ul>
     *   <li>Boolean: If no argument provide, returns he inverse state.
     *   <li>jB.Navbar: this
     * </ul>
     */
    ,inverse: function(state) {
        if (!arguments.length) {
            return this.hasClass('navbar-inverse')
        }

        return this.toggleClass('navbar-inverse', state)
    }

    /**
     * Fix the navbar to the top or bottom of the viewport.
     * Two values are allowed: <code>top</code>, <code>bottom</code>
     * @attribute fixed
     * @type String
     */

    /**
     * Fix the navbar to the top or bottom of the viewport.
     * @method fixed
     * @param {String} type Two values are allowed: <code>top</code> <code>bottom</code>
     * @return {String|jB.Navbar}
     * <ul>
     *  <li>String: If no argument provide, returns the fixed position.
     *  <li>jB.Navbar: this
     * </ul>
     */
    ,fixed: function(type) {
        if (!arguments.length) {
            return this.$fixedType
        }

        this.removeClass('navbar-fixed-top navbar-fixed-bottom')
            .cls('navbar-fixed-' + type)

        this.$fixedType = type
        return this
    }

    ,statics: function(type) {
        if (!arguments.length) {
            return this.$staticType
        }

        this.removeClass('navbar-static-top navbar-static-bottom')
            .cls('navbar-static-' + type)

        this.$staticType = type
        return this
    }

    ,collapsible: function(state) {
        var collapseControl = this.collapseControlCmp()
        this.containerCmp()
        this.containerCmp().prepend(collapseControl)
            .bodyCmp().addClass('nav-collapse navbar-responsive-collapse collapse')
                .target(collapseControl).collapsed(true)

        return this
    }

    ,collapseControlCmp: function() {
        if (!this.$collapseControlCmp) {
            this.$collapseControlCmp = jB.Component('<a class="btn btn-navbar"></a>', {
                html: '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>'
            })

            this.containerCmp().prepend(this.$collapseControlCmp)
        }

        return this.$collapseControlCmp
    }
})
