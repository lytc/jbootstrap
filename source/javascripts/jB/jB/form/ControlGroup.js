//= require ../Component

/**
 * @class jB.form.ControlGroup
 * @alias form.controlgroup
 * @extends jB.Component
 *
 * @example
 * jB.form.ControlGroup({
 *     label: 'Email'
 *     ,controls: [{
 *         xtype: 'textfield'
 *         ,placeHolder: 'email'
 *     }]
 * })
 */
jB.Component.extend('jB.form.ControlGroup form.controlgroup', {
    $cls: 'control-group'

    /**
     * The control group label
     *
     * <ul>
     *   <li>String: The label text
     *   <li>Object: The options apply to this label
     * </ul>
     * @attribute label
     * @type String|Object
     */

    /**
     * Get / Set the label of this control group
     *
     * @method label
     * @param {String|Object} label <ul>
     *                          <li>String: The label text
     *                          <li>Object: The options apply to this label
     *                        </ul>
     * @return {jB.form.Label|jB.form.ControlGroup}
     * <ul>
     *   <li>jB.form.Label: If no argument provide, returns the label component instance
     *   <li>jB.form.ControlGroup: this
     * </ul>
     */
    ,label: function(options) {
        if (!arguments.length) {
            return this.$labelCmp
        }

        if ('string' == typeof options) {
            options = {text: options}
        }

        this.labelCmp().options(options)
        return this
    }

    /**
     * Get the label component instance
     *
     * @method labelCmp
     * @return {jB.form.Label}
     */
    ,labelCmp: function() {
        if (!this.$labelCmp) {
            this.$labelCmp = jB.form.Label({
                cls: 'control-label'
            })
            this.prepend(this.$labelCmp)
        }

        return this.$labelCmp
    }

    /**
     * The controls options or items of this control group
     *
     * <ul>
     *   <li>Object: The options apply to this control component
     *   <li>Array: List of control items
     * </ul>
     * @attribute controls
     * @type Object|Array
     */

    /**
     * @method controls
     * @param {Object|Array} options <ul>
     *                               <li>Object: The options apply to this control component
     *                               <li>Array: List of control items
     *                             </ul>
     * @return {jB.form.Controls|jB.form.ControlGroup}
     * <ul>
     *   <li>jB.form.Controls: If no argument provide, return the controls component instance
     *   <li>jB.form.ControlGroup: this
     * </ul>
     */
    ,controls: function(options) {
        if (!arguments.length) {
            return this.$controlCmp
        }

        if (jB.$.isArray(options)) {
            options = {items: options}
        }

        this.controlCmp().options(options)
        return this
    }

    /**
     * Get the control component instance
     *
     * @method controlCmp
     * @return {jB.form.Controls}
     */
    ,controlCmp: function() {
        if (!this.$controlCmp) {
            this.$controlCmp = jB.form.Controls()
            this.append(this.$controlCmp)
        }

        return this.$controlCmp
    }

    /**
     * The control group validation states. Four values are allowed:
     * <code>error</code>, <code>warning</code>, <code>info</code>, and <code>success</code>
     *
     * @attribute validationState
     * @type String
     *
     * @example
     * jB.Form({
     *     layout: 'horizontal'
     *     ,defaults: {
     *         xtype: 'form.controlgroup'
     *         ,controls: {
     *             items: {
     *                 xtype: 'textfield'
     *             }
     *         }
     *     }
     *     ,items: [
     *         {
     *             label: 'Input with warning'
     *             ,validationState: 'warning'
     *             ,controls: {
     *                 help: 'Something may have gone wrong'
     *             }
     *         },{
     *             label: 'Input with error'
     *             ,validationState: 'error'
     *             ,controls: {
     *                 help: 'Please correct the error'
     *             }
     *         },{
     *             label: 'Input with info'
     *             ,validationState: 'info'
     *             ,controls: {
     *                 help: 'Username is taken'
     *             }
     *         },{
     *             label: 'Input with success'
     *             ,validationState: 'success'
     *             ,controls: {
     *                 help: 'Woohoo!'
     *             }
     *         }
     *     ]
     * })
     */

    /**
     * Get / Set validation state
     *
     * @method validationState
     * @param {String} [state] Four values are allowed:
     *                         <code>error</code>, <code>warning</code>, <code>info</code>, and <code>success</code>
     * @return {String|jB.form.ControlGroup}
     * <ul>
     *   <li>String: If no argument provide, returns the current validation state
     *   <li>jB.form.ControlGroup: this
     * </ul>
     */
    ,validationState: function(state) {
        if (!arguments.length) {
            return this.$validationState
        }

        this.removeClass(this.$validationState).addClass(state)
        this.$validationState = state
        return this
    }
})