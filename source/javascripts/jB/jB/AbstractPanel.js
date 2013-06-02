//= require ./Component

/**
 * @class jB.AbstractPanel
 * @extends jB.Component
 */
jB.Component.extend('jB.AbstractPanel', {
    $headerOptions: '<div>'
    ,$bodyOptions: '<div>'
    ,$footerOptions: '<div>'

    /**
     * The panel header
     *
     * @attribute header
     * @type Object|jB.Component
     */

    /**
     * Get the panel header Component or Set the panel header
     *
     * @method header
     * @param {Object|jB.Component} [header] <ul>
     *                                          <li>Object: The options apply to the header component.
     *                                          <li>jB.Component: A instanceof jB.Component
     *                                       </ul>
     * @return {jB.Component|jB.AbstractPanel}
     *  <ul>
     *      <li>jB.Component: the header component
     *      <li>jB.AbstractPanel: this
     *  </ul>
     */
    ,header: function(header) {
        if (!arguments.length) {
            return this.$headerCmp
        }

        this.headerCmp().items(header)
        return this
    }

    /**
     * Get the panel header component.
     *
     * @method headerCmp
     * @return {jB.Component}
     */
    ,headerCmp: function() {
        if (!this.$headerCmp) {
            this.$headerCmp = jB(this.$headerOptions)
            this.prepend(this.$headerCmp)
        }

        return this.$headerCmp
    }

    /**
     * The panel body
     *
     * @attribute body
     * @type Object|jB.Component
     */

    /**
     * Get the panel body Component or Set the panel body
     *
     * @method body
     * @param {Object|jB.Component} [body] <ul>
     *                                         <li>Object: The options apply to the body component.
     *                                         <li>jB.Component: A instanceof jB.Component
     *                                     </ul>
     * @return {jB.Component|jB.AbstractPanel}
     *  <ul>
     *      <li>jB.Component : the header component
     *      <li>jB.AbstractPanel: this
     *  </ul>
     */
    ,body: function(body) {
        if (!arguments.length) {
            return this.$bodyCmp
        }
        this.bodyCmp().items(body)
        return this
    }

    /**
     * Get the panel body component
     *
     * @method bodyCmp
     * @return {jB.Component}
     */
    ,bodyCmp: function() {
        if (!this.$bodyCmp) {
            this.$bodyCmp = jB(this.$bodyOptions)
            this.append(this.$bodyCmp)
            if (this.$footerCmp) {
                this.append(this.$footerCmp)
            }
        }

        return this.$bodyCmp
    }

    /**
     * The panel footer
     *
     * @attribute footer
     * @type Object|jB.Component
     */

    /**
     * Get the panel footer Component Set the panel footer
     *
     * @method footer
     * @param {Object|jB.Component} [footer] <ul>
     *                                         <li>Object: The options apply to the body component.
     *                                         <li>jB.Component: A instanceof jB.Component
     *                                       </ul>
     * @return {jB.Component|jB.AbstractPanel}
     *  <ul>
     *      <li>jB.Component: the footer component
     *      <li>jB.AbstractPanel: this
     *  </ul>
     */
    ,footer: function(footer) {
        if (!arguments.length) {
            return this.$footerCmp
        }

        this.footerCmp().items(footer)
        return this
    }

    /**
     * Get the panel footer component.
     *
     * @method footerCmp
     * @return {jB.Component}
     */
    ,footerCmp: function() {
        if (!this.$footerCmp) {
            this.$footerCmp = jB(this.$footerOptions)
            this.append(this.$footerCmp)
        }

        return this.$footerCmp
    }
})