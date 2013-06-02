//= require ../jB

/**
 * Base class for all jB components
 *
 * @example
 * jB.Component({
 *     el: '&lt;div&gt;text&lt;/div&gt;',
 *     width: 100,
 *     height: 100,
 *     css: {
 *         background: 'red'
 *     },
 *     click: function() {
 *         alert('Hi!')
 *     }
 * })
 *
 * @class jB.Component
 * @alias component
 * @requires jB
 */
jB.def('jB.Component component', {
    /**
     * @protected
     * @property $el
     * @type String
     * @default "div"
     */
    $el: '<div>'

    /**
     * @protected
     * @property $cls
     * @default ""
     */
    ,$cls: ''

    ,$defaultItemType: 'component'

    /**
     * @class jB.Component
     *
     * @constructor
     * @param {String} [el]
     * @param {Object} [options]
     */
    ,constructor: function(el, options) {
        this.$defaults = {}

        options || (options = el, el = undefined)
        options || (options = {})

        if (jB.$.type(options) == 'array') {
            options = {items: options}
        } else if (!jB.$.isPlainObject(options)) {
            options = {el: options}
        }
        !el || (options.el = el)


        this.el = jB.$(options.el || this.$el)
        this.el.prop('$cmp', this)
        this.onRender(options)

        this.cls(this.$cls)

        delete options.el
        this.options(jB.$.extend(true, this.$defaultOptions(), options))

        this.onRendered(options)

        !options.ready || options.ready.call(this)
    }

    /**
     * @protected
     * @method onRender
     */
    ,onRender: jB.$.noop
    ,onRendered: jB.$.noop

    ,$defaultOptions: jB.$.noop

    /**
     * Apply a set of setters to this Component
     *
     * @method options
     * @param {Object} options
     * @return {jB.Component}
     */
    ,options: function(options) {
        for (var i in options) {
            if ('function' == typeof this[i]) {
                this[i](options[i])
            }
        }

        return this
    }

    /**
     * The component id attribute
     *
     * @attribute id
     * @type String
     */

    /**
     * Get / Set the component id attribute
     * @method id
     * @param {String} [id]
     * @return {String|jB.Component}
     */
    ,id: function(id) {
        return this.attr.apply(this, arguments.length == 0? ['id'] : ['id', id])
    }

    /**
     * The target element that this component will be rendered into.
     *
     * @attribute renderTo
     * @type jQuerySelector|jB.Component
     */

    /**
     * Set the target element this component will be rendered into.
     * Similar to jQuery.replaceAll
     *
     * @method renderTo
     * @param {jQuerySelector|jB.Component} target
     * @return {jB.Component}
     */
    ,renderTo: function(target) {
        this.replaceAll(target)
        return this
    }

    /**
     * The dom class attribute option of this Component
     *
     * @attribute cls
     * @type String
     */

    /**
     * Add the dom class attribute option of this Component
     *
     * @method cls
     * @param {String} [cls]
     * @return {String|jB.Component}
     */
    ,cls: function(cls) {
        if (arguments.length == 0) {
            return this.el.attr('class')
        }

        var curCls = this.el.attr('class')
        !curCls || (cls = curCls + ' ' + cls)
        cls = cls.trim().replace(/\s+/g, ' ').split(' ')
        cls = cls.filter(function(item, index) {
            return index == cls.indexOf(item)
        })

        this.el.attr('class', cls.join(' '))
        return this
    }

    /**
     * Adds one or more CSS classes to this element and removes the same class(es) from all siblings.
     *
     * @method radioClass
     * @param {String} cls
     * @return {jB.Component}
     */
    ,radioClass: function(cls) {
        this.siblings().removeClass(cls)
        this.cls(cls)
        return this
    }

    /**
     * Fires before the component is disabled.
     *
     * @event disable
     * @param {jQuery.Event} e
     */

    /**
     * Fires before the component is enabled.
     *
     * @event enable
     * @param {jQuery.event} e
     */

    /**
     * Fires when the component is disabled.
     *
     * @event disabled
     * @param {jQuery.Event} e
     */

    /**
     * Fires when the component is enabled.
     *
     * @event enabled
     * @param {jQuery.event} e
     */

    /**
     * Enable / Disable this component.
     *
     * @attribute disabled
     * @type Boolean
     */

    /**
     * Toggle disable state of this component.
     *
     * @method disabled
     * @param {Boolean} [state]
     * @return {Boolean|jB.Component}
     */
    ,disabled: function(state) {
        var isInput     = this.is(':input')
            ,disabled   = !!isInput? this.is(':disabled') : this.hasClass('disabled')

        if (!arguments.length) {
            return disabled
        }

        if (disabled == state) {
            return this
        }

        var event = jB.$.Event(state? 'disable' : 'enable')
        this.trigger(event)

        if (event.isDefaultPrevented()) {
            return this
        }

        isInput? this[state? 'attr' : 'removeAttr']('disabled', 'disabled') : this.toggleClass('disabled', state)
        this.trigger(state? 'disabled': 'enabled')

        return this
    }

    /**
     * Change this component to enabled
     *
     * @method enable
     * @return {jB.Component}
     */
    ,enable: function() {
        return this.disabled(false)
    }

    /**
     * Change this component to disabled
     *
     * @method disable
     * @return {jB.Component}
     */
    ,disable: function() {
        return this.disabled(true)
    }

    /**
     * Applying the default options to all added children component.
     *
     * @attribute defaults
     * @type Object
     */

    /**
     * Set / Get the default option(s) apply to all added children component.
     *
     * @method defaults
     * @param {String|Object} property
     * @param {mixed} [value]
     * @return {jB.Component}
     */
    ,defaults: function(propperty, value) {
        if ('string' == typeof propperty) {
            if (1 == arguments.length) {
                return this.$defaults[propperty]
            }
            this.$defaults[propperty] = value
        } else {
            this.$defaults = jB.$.extend(true, this.$defaults, propperty)
        }

        return this
    }

    /**
     * The child component(s) to be added to this component.
     *
     * @attribute items
     * @type String|jQuery|Object|Array|jB.Component|jB.ComponentCollection
     */

    /**
     * Set the child component(s) of this component.
     *
     * @method items
     * @param {String|jQuery|Object|Array|jB.Component|jB.ComponentCollection} items
     * @return {jB.Component}
     */
    ,items: function() {
        this.empty().append.apply(this, arguments)
    }

    /**
     * Floated this component to left or right
     *
     * @attribute pullTo
     * @type String
     */

    /**
     * Floated this component to left or right
     *
     * @method pullTo
     * @param {String} type
     * @return {jB.Component}
     */
    ,pullTo: function(align) {
        if (!arguments.length) {
            return this.$pullAlign
        }

        this.removeClass('pull-left pull-right').cls('pull-' + align)
        this.$pullAlign = align
        return this
    }

    /**
     * The grid column size. Twelve values (from 1 to 12) are allowed
     *
     * @attribute span
     * @type Number
     */

    /**
     * Get / Set the grid column size of this component
     *
     * @method span
     * @param {Number} [span] Twelve values (from 1 to 12) are allowed
     * @return {Number|jB.Component}
     * <ul>
     *   <li>Number: If no argument provide, returns the current grid column size
     *   <li>jB.Component: this
     * </ul>
     */
    ,span: function(span) {
        if (!arguments.length) {
            return this.$span
        }

        this.removeClass(this.$span).addClass('span' + span)
        this.$span = span

        return this
    }

    /**
     * Add affix behavior to this component.
     *
     * @attribute affix
     * @type Boolean|Object
     */
    /**
     * Add affix behavior to this component.
     *
     * @method affix
     * @param {Boolean|Object} [options]
     * @return {jB.Component}
     */
    ,affix: function(options) {
        jB.ux.Affix(this, options)
        return this
    }

});

(function() {
    var proto       = jB.Component.prototype
        ,jQueryFn   = jB.$.fn
        ,excludes   = 'constructor append prepend appendTo prependTo ready init domManip'.split(' ')
        ,fns        = Object.keys(jQueryFn).filter(function(item) {
                        return -1 == excludes.indexOf(item)
                                && 'function' == typeof jQueryFn[item]
                    })

    jB.$.each(fns, function(index, method) {
        jB.Component.addMember(method, function() {
            var result = this.el[method].apply(this.el, arguments)
                ,promise = result && result.promise? result.promise(this) : null


            if (result == this.el) {
                return promise? promise : this
            }

            if (result instanceof jB.$) {
                var cmp, components = []
                result.each(function() {
                    cmp = jB.get(this)
                    if (cmp instanceof jB.Component) {
                        components.push(cmp)
                    }
                })

//                if (components.length == 1) {
//                    return components[0]
//                }

                return jB.ComponentCollection(components)
            } else {
                return result
            }
        })
    })

    jB.$.each(['append', 'prepend'], function(index, method) {
        jB.Component.addMember(method, function(el) {
            if (jB.$.isPlainObject(el) || el instanceof jB.Component) {
                el = [el]
            }

            if (el instanceof jB.ComponentCollection) {
                el = jB.ComponentCollection.toArray()
            }

            if (jB.$.isArray(el)) {
                var els = []
                for (var i = 0, len = el.length; i < len; ++i) {
                    !jB.$.isArray(el[i]) || (el[i] = {items: el[i]})

                    if (jB.$.isPlainObject(el[i])) {
                        el[i] = jB.$.extend(true, {}, this.$defaults, el[i])
                        el[i].xtype || (el[i].xtype = this.$defaultItemType)
                        el[i] = jB(el[i])
                    }

                    if (el[i] instanceof jB.Component) {
                        els = els.concat(el[i].el)
                    } else {
                        els.push(el[i])
                    }
                }

                arguments[0] = els

            }

            this.el[method].apply(this.el, arguments)
            return this
        })
    })

    jB.$.each(['appendTo', 'prependTo'], function(index, method) {
        jB.Component.addMember(method, function(target) {
            this.el[method].call(this.el, target instanceof jB.Component? target.el : target)
            return this
        })
    })

    // override animate
    var animateOld = proto.animate
    proto.animate = function() {
        if (-1 != 'fadeIn fadeOut fadeToggle fadeTo slideUp slideDown slideToggle'.split(' ').indexOf(arguments[0])) {
            return this[[].shift.call(arguments)].apply(this, arguments)
        }

        var method = arguments[0]
        if (-1 != 'show hide'.split(' ').indexOf(method)) {
            var args = [].slice.call(arguments, 1)
            if (!args.length) {
                args.push(jB.$.fx.speeds._default)
            }

            return this[method].apply(this, args)
        }

        return animateOld.apply(this, arguments)
    }
})();