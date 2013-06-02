describe('jB.Button', function() {
    describe('toggle', function() {
        it('should toggle', function() {
            var btn = jB.Button()
            btn.toggle()
            expect(btn.hasClass('active')).toBeTruthy()
            expect(btn.pressed()).toBeTruthy()

            btn.toggle()
            expect(btn.hasClass('active')).toBeFalsy()
            expect(btn.pressed()).toBeFalsy()

            btn.toggle(false)
            expect(btn.hasClass('active')).toBeFalsy()
            expect(btn.pressed()).toBeFalsy()

            btn.toggle(true)
            expect(btn.hasClass('active')).toBeTruthy()
            expect(btn.pressed()).toBeTruthy()
        })

        it('should trigger toggle event', function() {
            var pressedState
                ,count = 0
                ,btn = jB.Button({
                    on: {
                        toggle: function(e, pressed) {
                            pressedState = pressed
                            count ++
                        }
                    }
                })

            btn.toggle()
            expect(pressedState).toBeTruthy()
            expect(count).toEqual(1)

            btn.toggle()
            expect(pressedState).toBeFalsy()
            expect(count).toEqual(2)

            // it should not trigger toggle event if the state unchange
            btn.toggle(false)
            expect(pressedState).toBeFalsy()
            expect(count).toEqual(2)
        })

    })
})