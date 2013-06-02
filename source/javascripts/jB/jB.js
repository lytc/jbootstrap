/**
 * The jB namespace (global object) encapsulates all classes, singletons, and utility methods provided by jB libraries.
 *
 * @class jB.jB
 * @param {String|Element} el
 * @return {jB.Component}
 */

(function($) {
    var jBPrev = window.jB
        ,noArgs = []

    /**
     * @example
     * jB()
     * jB(function() {
     *     return '&lt;div&gt;'
     * })
     * jB({xtype: 'button'})
     * jB('&lt;div&gt;')
     * jB('&lt;div&gt;', {cls: 'class-name'})
     * jB(jQuery)
     * jB(jQuery, {cls: 'class-name'})
     * jB({el: '&lt;div&gt;', cls: 'class-name'})
     *
     * @class jB.jB
     * @constructor
     * @param {String|Object|jB.Component|Element|jQuery} el
     * @param {Boolean} options
     * @return {jB.Component}
     */
    window.jB = function(el, options) {
        if (!arguments.length) {
            el = {}
        }

        if ('function' == typeof el) {
            el = el()
        }

        if ('function' == typeof options) {
            options = options()
        }

        if (el instanceof jB.Component) {
            if (options) {
                el.options(options)
            }

            return el
        }

        if (!jB.$.isPlainObject(el)) {
            el = jB.$(el)
            var cmp = el.prop('$cmp')
            if (cmp instanceof jB.Component) {
                if (options) {
                    cmp.options(options)
                }
                return cmp
            }

            el = {el: el}
        }

        el = jB.$.extend(el, options)
        var klass = el.xtype? jB.alias[el.xtype] : jB.Component

        if (!klass) {
            jB.$.error('Undefined class "' + el.xtype + '"')
        }

        return new klass(el)
    }

    $(function(){
        jB.body = $(document.body)
    })

    /**
     * @static
     * @method noConflict
     * @return {jB}
     */
    jB.noConflict = function() {
        window.jB = jBPrev
        return this
    }

    $.extend(jB, {
        /**
         * Library version
         * @property version
         * @type String
         * @readOnly
         * @default "1.0"
         */
        version: '1.0'

        /**
         * The jQuery object reference
         * @property $
         * @type Object
         * @readOnly
         * @default jQuery
         */
        ,$: $

        ,noop: $.noop

        ,Event: $.Event

        ,win: $(window)

        ,doc: $(document)

        /**
         * @property alias
         * @type Object
         * @readOnly
         */
        ,alias: {}

        ,toJqueryPlugin: function() {
            var fns = {}
            for (var i in jB.alias) {
                fns[i] = function(options) {

                }
            }
        }

        /**
         * Generate the unique id
         * @method uniq
         * @param {String} [prefix]
         * @return {String}
         */
        ,uniq: (function(){
            var counters = {
                '': 0
            }
            return function(prefix) {
                prefix || (prefix = '')
                counters[prefix] || (counters[prefix] = 0)
                return prefix + counters[prefix]++
            }
        })()

        /**
         * @method namespace
         * @param {String|Array} parts
         * @param {mixed} [ref]
         * @return {mixed}
         */
        ,namespace: function(parts, ref, root) {
            var root = root || window
                ,part
                ,i
                ,len

            $.isArray(parts) || (parts = parts.split('.'))

            ref || (ref = {})

            for (i = 0, len = parts.length - 1; i < len; i++) {
                part = parts[i]

                if (typeof part != 'string') {
                    root = part
                } else {
                    if (!root[part]) {
                        root[part] = {}
                    }

                    root = root[part]
                }
            }

            return root[parts[parts.length - 1]] = ref
        }

        /**
         * Define a Class
         * @method def
         * @param {String} name
         * @param {Object} data
         * @return {Class}
         */


        ,def: function() {
            var hasProp     = {}.hasOwnProperty
                ,_extend    = function(child, parent, statics, proto) {
                    if (statics) {
                        for (var key in parent) {
                            !hasProp.call(parent, key) || (child[key] = parent[key])
                        }
                    }

                    if (proto) {
                        function ctor() {
                            this.constructor = child
                        }
                        ctor.prototype = parent.prototype
                        child.prototype = new ctor
                        child.__super__ = parent.prototype
                    }

                    return child
                }

            function BaseClass() {
            }

            _extend(BaseClass, {
                addMember: function(name, value) {
                    if ('string' == typeof name) {
                        var tmp = {}
                        tmp[name] = value
                        name = tmp
                    }

                    for (var key in name) {
                        if ('function' == typeof name[key]) {
                            name[key].$name = key
                            name[key].$owner = this
                        }
                    }

                    _extend(this.prototype, name, true)

                    return this
                }

                ,extend: function(name, data) {
                    data.$extend = this
                    return jB.def(name, data)
                }

                ,create: function(args){
                    args || (args = [])
                    var klass = this
                    function Fake(){
                        klass.apply(this, args)
                    }
                    Fake.prototype = this.prototype
                    return new Fake
                }

                ,methods: function() {
                    var methods = {}
                    for (var member in this.prototype) {
                        if ('function' != typeof this.prototype[member]) {
                            continue
                        }

                        methods[member] = this.prototype[member]
                    }

                    return methods
                }
            }, true, false, true)

            _extend(BaseClass.prototype, {
                callSuper: function(methodName, args) {
                    if ('string' !== typeof methodName) {
                        args = methodName
                        methodName = undefined
                    }

                    var method,
                        superMethod = (method = this.callSuper.caller) &&
                            ((method = method.$owner ? method : method.caller) &&
                                method.$owner.__super__[methodName || (methodName = method.$name)]);


                    if (!superMethod) {
                        jB.$.error('Call undefined super method: ' + methodName)
                    }

                    return superMethod.apply(this, args || noArgs)
                }
            }, true)

            return function(name, data) {
                data || (data = {})
                name = name.split(' ')
                if (2 == name.length) {
                    data.$alias = name[1]
                }
                name = name[0]

                var _alias     = data.$alias
                    ,_super     = data.$extend || BaseClass
                    ,_statics   = data.$statics
                    ,constructor = data.constructor !== Object.prototype.constructor? data.constructor : function() {
                        constructor.__super__.constructor.apply(this, arguments)
                    }

                _extend(constructor, _super, true, true)
                !_statics || _extend(constructor, _statics, true)

                delete data.$extend
                delete data.$statics
                delete data.$alias
                delete data.constructor

                constructor.addMember(data)

                function Class() {
                    return constructor.create(arguments)
                }

                _extend(Class, constructor, true)
                Class.prototype = constructor.prototype

                jB.namespace(name, Class)
                if (_alias) {
                    jB.alias[_alias] = Class

                    // custom jquery selector filter
                    jB.$.expr[':']['jb-' + _alias.replace(/\./g, '-')] = function(el) {
                        return el.$cmp && el.$cmp instanceof Class
                    }
                }

                return Class
            }
        }()


        ,get: function(el, type) {
            type || (type = jB.Component)

            if ('string' == typeof type) {
                type = jB.alias[type]
            }

            if (el instanceof type) {
                return el
            }

            var cmp = jB.$(el).prop('$cmp')
            if (cmp instanceof type) {
                return cmp
            }
        }

        ,wrap: function() {
            var push = Array.prototype.push

            return function (func, wrapper) {
                return function() {
                    var args = [func]
                    push.apply(args, arguments)
                    return wrapper.apply(this, args)
                }
            }
        }()

        ,wrapBefore: function(func, wrapper, args) {
            args || (args = [])
            return jB.wrap(func, function() {
                wrapper.apply(this, args)
                func.apply(this, args)
            })
        }

        ,wrapAfter: function(func, wrapper, args) {
            args || (args = [])
            return jB.wrap(func, function() {
                func.apply(this, args)
                wrapper.apply(this, args)
            })
        }

        ,defer: function(miliseconds, callback) {
            if (!callback) {
                callback = miliseconds
                miliseconds = 1
            }

            var timeoutId = setTimeout(callback, miliseconds)
            return {
                cancel: function() {
                    clearTimeout(timeoutId)
                }
            }
        }
    })
})(jQuery)