describe('jB.Component', function() {
    describe('append', function() {
        it('should append jB.Component', function() {
            var component = jB.Component({
                })
                ,child1 = jB.Component({
                    cls: 'child1'
                })
            component.append(child1)
            expect(component.el.children().length).toEqual(1)
        })

        it('should append array of jB.Component', function() {
            var component = jB.Component()
                ,child1 = jB.Component({
                    cls: 'child child1'
                })
                ,child2 = jB.Component({
                    cls: 'child child2'
                })

            component.append([child1, child2])
            expect(component.el.children().length).toEqual(2)
            expect(child1.el.next().get(0) === child2.el.get(0))
        })

        it('should append from plainObject', function() {
            var component = jB.Component()

            component.append({cls: 'child child1'})
            expect(component.el.children().length).toEqual(1)
        })

        it('should append from array plainObject', function() {
            var component = jB.Component()

            component.append([{cls: 'child child1'}, {cls: 'child child2'}])
            expect(component.el.children().length).toEqual(2)
            expect(component.el.children('.child1').next().is('.child2'))
        })

        it('should append from string', function() {
            var component = jB.Component()
            component.append('<div class="child1"></div>')
            expect(component.el.children().length).toEqual(1)
        })

        it('should append from array string', function() {
            var component = jB.Component()
            component.append(['<div class="child1"></div>', '<div class="child2"></div>'])
            expect(component.el.children().length).toEqual(2)
            expect(component.el.children('.child1').next().is('.child2'))
        })

        it('should append from mixed array', function() {
            var component = jB.Component()
            component.append([{cls: 'child child1'}, '<div class="child child2"></div>'])
            expect(component.el.children().length).toEqual(2)
            expect(component.el.children('.child1').next().is('.child2'))
        })
    })

    describe('prepend', function() {
        it('should prepend jB.Component', function() {
            var component = jB.Component({
                })
                ,child1 = jB.Component({
                    cls: 'child1'
                })
            component.prepend(child1)
            expect(component.el.children().length).toEqual(1)
        })

        it('should prepend array of jB.Component', function() {
            var component = jB.Component()
                ,child1 = jB.Component({
                    cls: 'child child1'
                })
                ,child2 = jB.Component({
                    cls: 'child child2'
                })

            component.prepend([child1, child2])
            expect(component.el.children().length).toEqual(2)
            expect(child1.el.prev().get(0) === child2.el.get(0))
        })

        it('should prepend from plainObject', function() {
            var component = jB.Component()

            component.prepend({cls: 'child child1'})
            expect(component.el.children().length).toEqual(1)
        })

        it('should prepend from array plainObject', function() {
            var component = jB.Component()

            component.append([{cls: 'child child1'}, {cls: 'child child2'}])
            expect(component.el.children().length).toEqual(2)
            expect(component.el.children('.child1').prev().is('.child2'))
        })

        it('should prepend from string', function() {
            var component = jB.Component()
            component.append('<div class="child1"></div>')
            expect(component.el.children().length).toEqual(1)
        })

        it('should prepend from array string', function() {
            var component = jB.Component()
            component.prepend(['<div class="child1"></div>', '<div class="child2"></div>'])
            expect(component.el.children().length).toEqual(2)
            expect(component.el.children('.child1').prev().is('.child2'))
        })

        it('should prepend from mixed array', function() {
            var component = jB.Component()
            component.prepend([{cls: 'child child1'}, '<div class="child child2"></div>'])
            expect(component.el.children().length).toEqual(2)
            expect(component.el.children('.child1').prev().is('.child2'))
        })
    })

    describe('prop', function() {
        it('should return property value with no arguments', function() {
            var el = $('<input type="checkbox">')
                ,checkboxCmp = jB({
                    el: el
                })

            expect(checkboxCmp.prop('checked')).toEqual(el.prop('checked'))
        })
    })

    describe('parent', function() {
        var parent = $('<div></div>')
            ,childCmp = jB({
                el: '<div></div>'
                ,appendTo: parent
            })

        it('should return empty jB.ComponentCollection if the parent has no jB.Component associate with it', function() {
            expect(childCmp.parent() instanceof jB.ComponentCollection).toBeTruthy()

        })

        it('should return jB.Component if the parent has jB.Component associate with it', function() {
            var parentCmp = jB({
                el: parent
            })

            expect(childCmp.parent()).toBe(parentCmp)
        })
    })

    describe('jQuery fn', function() {
        fns = "add addBack addClass after ajaxComplete ajaxError ajaxSend ajaxStart ajaxStop ajaxSuccess andSelf " +
            "animate append appendTo attr before bind blur change children clearQueue click clone closest constructor " +
            "contents contextmenu css data dblclick delay delegate dequeue detach domManip each empty end eq error " +
            "extend fadeIn fadeOut fadeTo fadeToggle filter find finish first focus focusin focusout get has hasClass " +
            "height hide hover html index init innerHeight innerWidth insertAfter insertBefore is keydown keypress " +
            "keyup last load map mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup next nextAll " +
            "nextUntil not off offset offsetParent on one outerHeight outerWidth parent parents parentsUntil position " +
            "prepend prependTo prev prevAll prevUntil promise prop push pushStack queue ready remove removeAttr " +
            "removeClass removeData removeProp replaceAll replaceWith resize scroll scrollLeft scrollTop select " +
            "serialize serializeArray show siblings size slice slideDown slideToggle slideUp sort splice stop submit " +
            "text toArray toggle toggleClass trigger triggerHandler unbind undelegate unload unwrap val width wrap " +
            "wrapAll wrapInner";

        var el = $('<div></div>')
            ,cmp = jB({
                el: el
            })
            ,result

        it('addClass', function() {
            result = cmp.addClass('class1 class2')
            expect(result).toBe(cmp)
            expect(el.hasClass('class1')).toBeTruthy()
            expect(el.hasClass('class2')).toBeTruthy()
        })

        it('hasClass', function() {
            expect(cmp.hasClass('class1')).toEqual(el.hasClass('class1'))
            expect(cmp.hasClass('class3')).toEqual(el.hasClass('class3'))
        })

        it('removeClass', function() {
            expect(el.hasClass('class1')).toBeTruthy()
            expect(el.hasClass('class2')).toBeTruthy()
            result = cmp.removeClass('class1 class2')
            expect(result).toBe(cmp)
            expect(el.hasClass('class1')).toBeFalsy()
            expect(el.hasClass('class2')).toBeFalsy()

        })

        it('toggleClass', function() {
            expect(el.hasClass('class1')).toBeFalsy()
            expect(el.hasClass('class2')).toBeFalsy()
            result = cmp.toggleClass('class1 class2')
            expect(result).toBe(cmp)
            expect(el.hasClass('class1')).toBeTruthy()
            expect(el.hasClass('class2')).toBeTruthy()
        })

        it('width', function() {
            result = cmp.width(100)
            expect(result).toBe(cmp)
            expect(cmp.width()).toEqual(el.width())
        })

        it('height', function() {
            result = cmp.height(100)
            expect(result).toBe(cmp)
            expect(cmp.height()).toEqual(el.height())
        })

        it('outerWidth', function() {
            expect(cmp.outerWidth()).toEqual(el.outerWidth())
            expect(cmp.outerWidth(true)).toEqual(el.outerWidth(true))
        })

        it('outerHeight', function() {
            expect(cmp.outerHeight()).toEqual(el.outerHeight())
            expect(cmp.outerHeight(true)).toEqual(el.outerHeight(true))
        })
    })
})