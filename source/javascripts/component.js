(function($) {
    $(function() {
        $.getJSON('/data/api/data.json?' + new Date().getTime(), function(result) {
            var apis = {}
                ,parts
                ,item
                ,tree = []
                ,classTree = {}
                ,classList = $.map(result.classes, function(classData, name) {
                    return name
                })

            for (var i = 0; i < classList.length; ++i) {
                parts = classList[i].split('.')
                item = '{"' + parts.join('":{"') + '":"' + classList[i] + '"' + (new Array(parts.length + 1)).join('}')
                item = JSON.parse(item)
                $.extend(true, classTree, item)
            }

            function sortBy(list, property) {
                return list.sort(function(a, b) {
                    a = a[property].toLowerCase()
                    b = b[property].toLowerCase()

                    if (a < b) return -1
                    if (a > b) return 1
                    return 0
                })
            }

            function buildTreeItem(root, data) {
                for (var i in data) {
                    if ('string' == typeof data[i]) {
                        item = {
                            id: data[i]
                            ,text: data[i].split('.').pop()
                            ,href: '#' + data[i]
                        }
                    } else {
                        item = {
                            text: i
                            ,items: buildTreeItem([], data[i])
                        }
                    }

                    root.push(item)

                }
                return root
            }

            buildTreeItem(tree, classTree)

            //
            var className
            for (var i = 0, len = classList.length; i < len; ++i) {
                className = classList[i]
                apis[className] = {
                    name: className
                    ,extend: result.classes[className].extends
                    ,alias: result.classes[className].alias
                    ,description: result.classes[className].description
                    ,examples: result.classes[className].example || []
                    ,members: {
                        attribute: {}
                        ,property: {}
                        ,method: {}
                        ,event: {}
                    }
                }
            }

            for (var i = 0, len = result.classitems.length; i < len; ++i) {
                apis[result.classitems[i].class].members[result.classitems[i].itemtype][result.classitems[i].name] = result.classitems[i]
            }

            function values(o) {
                var result = []
                for (var i in o) {
                    result.push(o[i])
                }
                return result
            }

            $.each(apis, function(className, data) {
                if (apis[className].extend) {
                    $.each(apis[apis[className].extend].members, function(type, items) {
                        $.each(items, function(index, item) {
                            if (data.members[type][item.name]) {
                                return
                            }

                            data.members[type][item.name] = item
                        })
                    })
                }
            })

            $.each(apis, function(className, data) {
                $.each(apis[className].members, function(sectionName, section) {
                    $.each(section, function(memberName, member) {
                        if (member.see) {
                            var see = member.see[0].split('.')
                                ,seeMember = see.pop()
                                ,seeClass = see.join('.')
                                ,seeMemberData = apis[seeClass].members[member.itemtype][seeMember]

                            for (var i in seeMemberData) {
                                if (undefined !== this[i]) {
                                    continue
                                }

                                this[i] = seeMemberData[i]
                            }
                        }
                    })
                })
            })

            $.each(apis, function(className, data) {
                data.members = {
                    options: sortBy(values(data.members.attribute), 'name')
                    ,properties: sortBy(values(data.members.property), 'name')
                    ,methods: sortBy(values(data.members.method), 'name')
                    ,events: sortBy(values(data.members.event), 'name')
                }
            })



            var linksMap = {
                    'Boolean':      'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Boolean'
                    ,'Number':      'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number'
                    ,'Object':      'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object'
                    ,'Array':       'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array'
                    ,'Function':    'https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function'
                    ,'Element':     'https://developer.mozilla.org/en/docs/DOM/element'
                    ,'jQuery':      'http://api.jquery.com/Types/#jQuery'
                    ,'jQuery.Event': 'http://api.jquery.com/category/events/event-object'
                }
                ,link
                ,target
                ,linkTemplate = _.template('<a href="<%= link %>" <% if (target) { %>target="<%= target %>"<% } %>><%= name %></a>')
            _.template.typeLink = function(types) {
                if (!types) {
                    return ''
                }

                types = types.split('|')
                for (var i = 0, len = types.length; i < len; ++i) {
                    target = false
                    if (types[i].substr(0, 3) == 'jB.') {
                        link = '/components.html#' + types[i]
                    } else if (linksMap[types[i]]) {
                        link = linksMap[types[i]]
                        target = '_blank'
                    } else {
                        link = '#'
                    }
                    types[i] = linkTemplate({name: types[i], link: link, target: target})
                }
                return types.join('<span class="muted"> | </span>')
            }
            var template = _.template($('#api-tpl').html())
            tree[0].expanded = true


            new jB.Component({
                el: '#doctree-container'
                ,affix: {
                    offset: {
                        top: $('#header').outerHeight() + 10
                        ,bottom: 270
                    }
                }
            })
            new jB.Tree({
                appendTo: '#doctree-container'
                ,css: {
                    marginLeft: 0
                }
                ,items: tree
            })

            var searchDeferredTimeoutId

            var toolbar = new jB.Navbar({
                renderTo: '#api-toolbar'
                ,id: 'api-toolbar'
                ,cls: 'span9'
                ,hide: true
                ,collapsible: true
                ,affix: {
                    offset: {
                        top: $('#header').outerHeight() + 10
                        ,bottom: 270
                    }
                }
                ,css: {
                    zIndex: 999
                    ,marginLeft: 0
                }
                ,items: [
                    {
                        xtype: 'form'
                        ,layout: 'navbar-search'
                        ,items: {
                            xtype: 'textfield'
                            ,search: true
                            ,placeHolder: 'Filter members'
                            ,width: 100
                            ,keyup: function() {
                                clearTimeout(searchDeferredTimeoutId)
                                var me = this

                                searchDeferredTimeoutId = setTimeout(function() {
                                    var val = $(me).val().trim()
                                        ,all = $('#api .member')

                                    if (!val) {
                                        all.removeClass('hide')
                                        return
                                    }

                                    all.addClass('hide')
                                    $('#api .member[data-name^="' + val + '"]').removeClass('hide')
                                }, 200)
                            }
                            ,focus: function() {
                                jB(this).animate({width: 300})
                                var nav = jB('#toolbar-nav')
                                nav.data('originalWidth', nav.outerWidth())
                                    .height(30)
                                    .css('overflow', 'hidden')
                                    .animate({width: 0})
                            }
                            ,blur: function() {
                                jB(this).animate({width: 100})
                                var nav = jB('#toolbar-nav')
                                nav.animate({width: nav.data('originalWidth')}).done(function() {
                                    jB(this).height('auto').css('overflow', 'visible')
                                })
                            }
                        }
                    },{
                        xtype: 'navbar.nav'
                        ,id: 'toolbar-nav'
                        ,defaults: {
                            ready: function() {
                                new jB.Popover({
                                    target: this
                                    ,triggerType: 'hover'
                                    ,placement: 'bottom'
                                    ,body: 'Options'
                                    ,on: {
                                        show: function() {
                                            var className = $('#api').data('class')
                                            if (this.class == className) {
                                                return
                                            }
                                            this.class = className

                                            var me = jB.get(this)
                                                ,members = apis[className].members[me.target().data('section')]
                                                ,member
                                                ,items = []

                                            if (!members.length) {
                                                return me.body('<small><em class="muted" style="white-space: nowrap">No data to display</em></small>')
                                            }

                                            for (var i in members) {
                                                member = members[i]
                                                items.push({
                                                    el: '<li class="member">'
                                                    ,cls: function(){
                                                        var cls = [member.access? member.access : 'public']
                                                        if (member.class != className) {
                                                            cls.push('inherited')
                                                        }
                                                        return cls.join(' ')

                                                    }()
                                                    ,items: {
                                                        el: '<a>'
                                                        ,text: member.name
                                                        ,attr: {
                                                            href: '#' + member.class + '-' + member.name
                                                        }
                                                    }
                                                })
                                            }

                                            me.body({
                                                el: '<ul class="unstyled">'
                                                ,items: items
                                            })
                                        }
                                    }
                                })
                            }
                        }
                        ,items: [
                            '-',{
                                text: 'Options'
                                ,data: {
                                section: 'options'
                            }

                            },{
                                text: 'Properties'
                                ,data: {
                                    section: 'properties'
                                }
                            },{
                                text: 'Methods'
                                ,data: {
                                    section: 'methods'
                                }
                            },{
                                text: 'Events'
                                ,data: {
                                    section: 'events'
                                }
                            }
                        ]
                    },{
                        xtype: 'button.menu'
                        ,button: 'Show'
                        ,menuAlign: 'right'
                        ,pullTo: 'right'
                        ,menu: {
                            defaults: {
                                xtype: 'menu.checkitem'
                                ,on: {
                                    checkchange: function(e, checked, checkValue) {
                                        $('#api').toggleClass(checkValue, checked)
                                    }
                                }
                                ,ready: function() {
                                    if (!(this instanceof jB.menu.CheckItem)) {
                                        return
                                    }
                                    $('#api').toggleClass(this.checkValue(), this.checked())
                                }
                            }
                            ,items: [
                                {
                                    text: 'Public'
                                    ,checkValue: 'public'
                                    ,checked: true
                                },{
                                    text: 'Protected'
                                    ,checkValue: 'protected'
                                },{
                                    text: 'Private'
                                    ,checkValue: 'private'
                                },'-',{
                                    text: 'Options'
                                    ,checkValue: 'options'
                                    ,checked: true
                                },{
                                    text: 'Properties'
                                    ,checkValue: 'properties'
                                    ,checked: true
                                },{
                                    text: 'Methods'
                                    ,checkValue: 'methods'
                                    ,checked: true
                                },{
                                    text: 'Events'
                                    ,checkValue: 'events'
                                    ,checked: true
                                },'-',{
                                    text: 'Inherited'
                                    ,checkValue: 'inherited'
                                }
                            ]
                        }
                    }
                ]
            })

            Router = new (Backbone.Router.extend({
                routes: {
                    'jB.:path': 'load'
                }
                ,load: function(path) {
                    var parts = path.split('-')
                        ,className = 'jB.' + parts[0]

                    toolbar.slideDown()

                    // load class api
                    var classApi = apis[className]

                    $('#api').data('class', className)
                    $('#api section.class').detach()

                    if (classApi.$cmp) {
                        classApi.$cmp.appendTo('#api')
                    } else {
                        classApi.$cmp = new jB.Component({
                            appendTo: '#api'
                            ,el: '<section>'
                            ,cls: 'class'
                            ,html: template(classApi)
                        })

                        classApi.$cmp.el.find('li.member').each(function() {
                            $(this).prop('originalHeight', $(this).height())
                            $(this).addClass('collapsed')
                        })

                        Application.renderCodeEditor(classApi.$cmp.el.find('pre.example'))

                    }

                    var bodyPaddingTop = parseInt($(document.body).css('paddingTop'))


                    $(document.body).delay(100).animate({
                        scrollTop: $(parts.length == 1? '#body' :'#jB-' + path.replace(/\./g, '-')).offset().top - bodyPaddingTop - 60
                    }, 500)
                }
            }))
            Backbone.history.start()

        })

        $('#api').on('click', '.member > .name, .member > .caret', function(e) {
            var me = $(this)
                ,li = me.parent()
                ,description = li.find('.description')
            if (li.hasClass('collapsed')) {
                description.animate({
                    height: description.children('.inner').outerHeight(true)
                })
            } else {
                description.animate({
                    height: 24
                })
            }
            description.promise().done(function() {
                li.toggleClass('collapsed')
            })
            return false
        })
    })
})(jQuery)