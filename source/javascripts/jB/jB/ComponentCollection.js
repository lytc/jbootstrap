//= require ./Component

/**
 * @class jB.ComponentCollection
 */
(function() {
    var noArgs = []

    jB.def('jB.ComponentCollection', {
        constructor: function(components) {
            components || (components = [])
            this.$components = components
        }

        ,callEach: function(method, args) {
            args || (args = noArgs)
            var i, len, cmp, result, chainable = false
            for (i = 0, len = this.$components.length; i < len; ++i) {
                cmp = this.$components[i]
                result = cmp[method].apply(cmp, args)
                if (result == cmp) {
                    chainable = true
                }
            }

            return chainable? this : result
        }

        ,toArray: function() {
            return this.$components
        }
    })

    var methods     = jB.Component.methods()
        ,excludes   = 'constructor'.split(' ')

    jB.$.each(methods, function(method) {
        if (-1 != excludes.indexOf(method)) {
            return
        }
        jB.ComponentCollection.prototype[method] = function() {
            return this.callEach(method, arguments)
        }
    })
})()

