//= require ./Popover

/**
 * @example
 * var modal = jB.Modal({
 *   title: 'Modal Heading'
 *   ,body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis, tortor in tincidunt aliquam, diam neque rutrum enim, sed hendrerit tortor turpis eget lectus. Nulla a tortor est. Vivamus augue magna, accumsan eget vulputate non, tincidunt sed odio. Curabitur sapien erat, aliquam et lacinia ut, molestie at neque. Vivamus sed nulla nisl. Cras luctus venenatis leo, eu malesuada mauris mattis vel. Proin ultrices porttitor tortor, ac dapibus libero tincidunt sed.'
 *   ,footer: 'Modal Footer'
 *   ,backdrop: true
 *   //,animation: 'fade'
 *   ,closable: true
 *
 * })
 *
 * jB.Button({
 *     text: 'Show Modal'
 *     ,click: function() {
 *         modal.show()
 *     }
 * })
 *
 * @class jB.Modal
 * @alias modal
 * @extends jB.Popover
 */
jB.Popover.extend('jB.Modal modal', {
    $cls: 'modal'
    ,$headerOptions: '<div class="modal-header"></div>'
    ,$bodyOptions: '<div class="modal-body"></div>'
    ,$footerOptions: '<div class="modal-footer"></div>'
    ,$animation: 'slide'
    ,$closeAction: 'hide'

    ,onRendered: jB.noop

    ,onShow: function() {
        var target = this.target()

        this.target().append(this.el)
        if (this.$backdrop) {
            this.backdropCmp().appendTo(target).fadeIn()
        }
    }

    ,onHide: function() {
        var backdrop = this.$backdropCmp
        if (backdrop) {
            backdrop.fadeOut(function() {
                backdrop.detach()
            })
        }
    }

    /**
      * The modal title
      * @attribute title
      * @type String|Object|jB.Component
      */

    /**
     * Get / Set the modal title
     *
     * @method title
     * @param {String|Object|jB.Component} [title] <ul>
     *                                               <li>String: The title text/html apply to modal title.
     *                                               <li>Object: The options apply to modal title.
     *                                               <li>jB.Component: A instance of jB.Component append to modal title.
     *                                             </ul>
     * @return {jB.Component|jB.Modal}
     * <ul>
     *   <li>jB.Component: If no argument provide, return the title component instance.
     *   <li>jB.Modal: this
     * </ul>
     */
    ,title: function(title) {
        if (!arguments.length) {
            return this.$titleCmp
        }

        this.titleCmp().items(title)
        return this
    }

    /**
     * Get the modal title component.
     * @method titleCmp
     * @return {jB.Component}
     */
    ,titleCmp: function() {
        if (!this.$titleCmp) {
            this.$titleCmp = jB('<h3>')

            this.headerCmp().append(this.$titleCmp)
        }

        return this.$titleCmp
    }

    /**
     * Enable / Disable the modal close button.
     *
     * @attribute closable
     * @type Boolean
     * @default false
     */

    /**
     * Enable / Disable the modal close button.
     *
     * @method closable
     * @param {Boolean} [state]
     * @return {Boolean|jB.Modal}
     * <ul>
     *   <li>Boolean: If no argument provide, return the closable state.
     *   <li>jB.Modal: this
     * </ul>
     */
    ,closable: function(state) {
        this.closeCmp()[state? 'show' : 'hide']()
    }

    /**
     * Get the modal close button.
     *
     * @method getCloseCmp
     * @return {jB.Component}
     */
    ,closeCmp: function() {
        if (!this.$closeCmp) {
            var me = this
            this.$closeCmp = jB('<button class="close" type="button">×</button>', {
                click: function() {
                    me.close()
                }
            })

            this.headerCmp().prepend(this.$closeCmp)
        }

        return this.$closeCmp
    }

    /**
     * Enable / Disable the modal-backdrop element.
     *
     * @attribute backdrop
     * @type Boolean
     * @default true
     */

    /**
     * Enable / Disable the modal-backdrop element.
     *
     * @method backdrop
     * @param {Boolean} [state]
     * @return {Boolean|jB.Modal}
     * <ul>
     *   <li>jB.Component: If no argument provide, return the modal-backdrop state
     *   <li>jB.Modal: this
     * </ul>
     */
    ,backdrop: function(state) {
        if (!arguments.length) {
            return this.$backdrop
        }

        this.$backdrop = state
        return this
    }

    /**
     * Get the modal backdrop component.
     *
     * @method backdropCmp
     * @return {jB.Component}
     */
    ,backdropCmp: function() {
        if (!this.$backdropCmp) {
            this.$backdropCmp = jB('<div class="modal-backdrop" style="display: none"></div>')
        }

        return this.$backdropCmp
    }

    ,target: function(target) {
        if (!this.$target) {
            this.$target = jB.body
        }

        if (!arguments.length) {
            return this.$target
        }

        if (target instanceof jB.Component) {
            target = target.el
        }

        this.$target = target
        return this
    }

    /**
     * The action to take when the close button is clicked.
     *
     * @attribute closeAction
     * @type String
     */

    /**
     * Get / Set the action to take when the close button is clicked.
     *
     * @method closeAction
     * @param {String} action Two values are allowed: <code>hide</code> <code>remove</code>
     * @return {String|jB.Modal}
     * <ul>
     *   <li>String: If no argument provide, return the close action type.
     *   <li>jB.Modal: this
     * </ul>
     */
    ,closeAction: function(action) {
        if (!arguments.length) {
            return this.$closeAction
        }

        this.$closeAction = action
        return this
    }

    /**
     * Close the modal
     * @method close
     * @return {jB.Modal}
     */
    ,close: function() {
        var me = this
        this.hide().done(function() {
            me.closeAction() != 'remove' || me.remove()
        })

        return this
    }

    /**
     * @see jB.Component.remove
     * @method remove
     */
    ,remove: function() {
        !this.$backdropCmp || this.$backdropCmp.remove()
        return this.callSuper()
    }
})