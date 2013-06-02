describe('jB.Collapse', function() {
    it('should create an instance of jB.Collapse with default options', function() {
        var collapse = jB.Collapse()
        expect(collapse instanceof jB.Collapse).toBeTruthy()
        expect(collapse.collapsed()).toBeFalsy()
        expect(collapse.offset()).toEqual(0)
    })

    it('should create an instance of jB.Collapse with custom options', function() {
        var collapse = jB.Collapse({
            collapsed: true
            ,offset: 10
        })

        expect(collapse.collapsed()).toBeTruthy()
        expect(collapse.offset()).toEqual(10)
    })

    describe('.toggle', function() {
        it('should trigger toggle event', function() {
            var collapse        = jB.Collapse()
                ,collapsed      = collapse.collapsed()
                ,collapsedState = null

            collapse.on('toggle', function(e, collapsed) {
                collapsedState = collapsed
            })

            collapse.toggle()
            expect(collapsedState).toEqual(!collapsed)
        })

        it('should trigger collapse event', function() {
            var collapse        = jB.Collapse()
                ,eventType      = null

            collapse.on('collapse', function(e) {
                eventType = e.type
            })

            collapse.toggle()
            expect(eventType).toEqual('collapse')

        })

        it('should trigger collapse event', function() {
            var collapse        = jB.Collapse({
                    collapsed: true
                })
                ,eventType      = null

            collapse.on('expand', function(e) {
                eventType = e.type
            })

            collapse.toggle()
            expect(eventType).toEqual('expand')

        })

        it('should trigger toggled event', function() {
            var collapse        = jB.Collapse()
                ,collapsedState = null
                ,flag           = false

            collapse.on('toggled', function(e, collapsed) {
                collapsedState = collapsed
                flag = true
            })

            waitsFor(function() {
                return flag
            })

            runs(function() {
                expect(collapsedState).toBeTruthy()
            })

            collapse.toggle()
        })

        it('should trigger collapsed event', function() {
            var collapse        = jB.Collapse()
                ,collapsedState = null
                ,flag           = false

            collapse.on('collapsed', function(e) {
                collapsedState = true
                flag = true
            })

            waitsFor(function() {
                return flag
            })

            runs(function() {
                expect(collapsedState).toBeTruthy()
            })

            collapse.toggle()
        })

        it('should trigger expanded event', function() {
            var collapse        = jB.Collapse({
                    collapsed: true
                })
                ,collapsedState = null
                ,flag           = false

            collapse.on('expanded', function(e) {
                collapsedState = false
                flag = true
            })

            waitsFor(function() {
                return flag
            })

            runs(function() {
                expect(collapsedState).toBeFalsy()
            })

            collapse.toggle()
        })

        it('should work with state param', function() {
            var collapse    = jB.Collapse()
                ,count      = 0

            collapse.on('toggle', function() {
                count ++
            })

            collapse.toggle(false)
            expect(collapse.collapsed()).toBeTruthy()
            expect(count).toEqual(1)

            collapse.toggle(false)
            expect(count).toEqual(1)
        })
    })
})