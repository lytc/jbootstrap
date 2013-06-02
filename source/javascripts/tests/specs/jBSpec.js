describe('jB', function() {
    describe('noConflict', function() {
        it('should return jB', function() {
            var jb = jB
                ,ns = jB.noConflict()
            expect(ns).toBe(jb)
            window.jB = jb
        })
    })

    describe('constructor', function() {
        it('should create a component instance', function() {
            var cmp
            cmp = jB()
            expect(cmp instanceof jB.Component).toBeTruthy()

            cmp = jB({xtype: 'component', cls: 'class'})
            expect(cmp instanceof jB.Component).toBeTruthy()
            expect(cmp.el.attr('class')).toEqual('class')

            cmp = jB('<div>')
            expect(cmp instanceof jB.Component).toBeTruthy()

            cmp = jB('<div>', {cls: 'class'})
            expect(cmp instanceof jB.Component).toBeTruthy()
            expect(cmp.el.attr('class')).toEqual('class')

            cmp = jB($('<div>'))
            expect(cmp instanceof jB.Component).toBeTruthy()

            var el = $('<div>')
                ,btn = jB.Button({el: el})

            expect(jB(btn)).toBe(btn)
            expect(jB(el)).toBe(btn)
        })
    })

    describe('$', function() {
        it('should return jQuery', function() {
            expect(jB.$).toBe(jQuery)
        })
    })

    describe('noop', function() {
        it('should return the jQuery.noop function', function() {
            expect(jB.noop).toBe(jQuery.noop)
        })
    })

    describe('uniq', function() {
        it('should return increment uniq number', function() {
            var one = parseInt(jB.uniq())
                ,two = parseInt(jB.uniq())
            expect(two).toEqual(one + 1)
        })
    })

    describe('namespace', function() {
        it('should create namespace', function() {
            jB.namespace('__testNamespace.foo.bar')
            expect(jB.$.isPlainObject(window.__testNamespace.foo.bar)).toBeTruthy()

            var ref = function() {}
            jB.namespace('__testNamespace.foo.baz', ref)
            expect(window.__testNamespace.foo.baz).toBe(ref)

            var foo = function() {}
                ,root = {
                __testNamespace: {foo: foo}
            }
            jB.namespace('__testNamespace.foo.qux', ref, root)
            expect(root.__testNamespace.foo.qux).toBe(ref)
            expect(root.__testNamespace.foo).toBe(foo)
        })
    })

    describe('def', function() {
        it('should create a class', function() {
            window.__testDef = {}
            var alias = '__testDef.foo'
                ,fooStaticProperty1  = 'fooStaticProperty1'
                ,fooStaticMethod1    = function() {}
                ,fooProperty1        = 'foproperty1'
                ,fooMethod1          = function() {}
                ,fooStaticProperty2  = 'fooStaticProperty2'
                ,fooStaticMethod2    = function() {}
                ,fooProperty2        = 'fooproperty2'
                ,fooMethod2          = function() {}

                ,barStaticProperty1  = 'barStaticPropery1'
                ,barStaticMethod1    = function() {}
                ,barProperty1        = 'barproperty1'
                ,barMethod1          = function() {}
                ,barStaticProperty2  = 'barStaticPropery2'
                ,barStaticMethod2    = function() {}
                ,barProperty2        = 'barproperty2'
                ,barMethod2          = function() {}


            jB.def('__testDef.Foo', {
                $alias: alias
                ,$statics: {
                    staticProperty1:    fooStaticProperty1
                    ,staticMethod1:     fooStaticMethod1
                    ,staticProperty2:   fooStaticProperty2
                    ,staticMethod2:     fooStaticMethod2
                }
                ,property1: fooProperty1
                ,method1:   fooMethod1
                ,property2: fooProperty2
                ,method2:   fooMethod2
            })

            expect(jB.alias[alias]).toBe(__testDef.Foo)
//            expect(__testDef.Foo.staticProperty1).toBe(fooStaticProperty1)
//            expect(__testDef.Foo.staticMethod1).toBe(fooStaticMethod1)
//            expect(__testDef.Foo.staticProperty2).toBe(fooStaticProperty2)
//            expect(__testDef.Foo.staticMethod2).toBe(fooStaticMethod2)
//
//            var fooInstance = new __testDef.Foo
//            expect(fooInstance.property1).toBe(fooProperty1)
//            expect(fooInstance.method1).toBe(fooMethod1)
//            expect(fooInstance.property2).toBe(fooProperty2)
//            expect(fooInstance.method2).toBe(fooMethod2)
//
//            jB.def('__testDef.Bar', {
//                $extend: __testDef.Foo
//                ,$statics: {
//                    staticProperty1:    barStaticProperty1
//                    ,barStaticProperty2: barStaticProperty2
//                    ,staticMethod1:     barStaticMethod1
//                    ,barStaticMethod2:  barStaticMethod2
//                }
//                ,property1:     barProperty1
//                ,barProperty2:  barProperty2
//                ,method1:       barMethod1
//                ,barMethod2:    barMethod2
//            })
//
//            expect(__testDef.Bar.staticProperty1).toBe(barStaticProperty1)
//            expect(__testDef.Bar.staticProperty2).toBe(fooStaticProperty2)
//            expect(__testDef.Bar.barStaticProperty2).toBe(barStaticProperty2)
//
//            var barInstance = new __testDef.Bar
//            expect(barInstance.property1).toBe(barProperty1)
//            expect(barInstance.property2).toBe(fooProperty2)
//            expect(barInstance.barProperty2).toBe(barProperty2)
//
//            expect(barInstance.method1).toBe(barMethod1)
//            expect(barInstance.method2).toBe(fooMethod2)
//            expect(barInstance.barMethod2).toBe(barMethod2)
        })

        it('should callSupper', function() {
            window.__testDef = {}
            jB.def('__testDef.Foo', {
                foo: function(foo) {
                    undefined !== foo || (foo = 1)
                    return foo + 1
                }
            })

            jB.def('__testDef.Bar', {
                $extend: __testDef.Foo
//                ,foo: function(foo, bar) {
//                    undefined !== bar || (bar = 1)
//                    return this.callSuper(arguments) + bar + 1
//                }
//                ,bar: function() {
//                    return this.callSuper()
//                }
//                ,baz: function() {
//                    return this.callSuper('foo', arguments)
//                }
            })

            jB.def('__testDef.Baz', {
                $extend: __testDef.Bar
            })

            var fooInstance     = new __testDef.Foo
//                ,barInstance    = new __testDef.Bar
//                ,bazInstance    = new __testDef.Baz

//            expect(fooInstance.foo()).toEqual(2)
//            expect(fooInstance.foo(2)).toEqual(3)
//            expect(barInstance.foo()).toEqual(4)
//            expect(barInstance.foo(2)).toEqual(5)
//            expect(bazInstance.foo()).toEqual(4)
//            expect(barInstance.baz()).toEqual(2)
//            expect(barInstance.baz(2)).toEqual(3)
//
//            expect(function() {barInstance.bar()}).toThrow('Call undefined super method: bar')

        })
    })
})