//= require_tree ./jB

$(function() {
    Backbone.history.start({pushState: true})
    Router = new (Backbone.Router.extend({
        routes: {
            home: 'home'
            ,'getting-started' : 'gettingStarted'
            ,component: 'component'
            ,customize: 'customize'
        }

        ,home: function() {
            $('#header > .container').html($('#home-banner-tpl').html())
        }

        ,gettingStarted: function() {
            console.log('getting started')
        }

        ,component: function() {
            console.log('component')
        }

        ,customize: function() {
            console.log('customize')
        }
    }))

    var viewPort = new jB.Component({
        appendTo: document.body
        ,items: [
            { // navbar
                xtype: 'navbar'
                ,inverse: true
                ,fixed: 'top'
                ,brand: {
                    text: 'Bootstrap JS'
                    ,attr: {
                        href: '/home'
                    }
                }
                ,nav: [
                    {
                        text: 'Get Started'
                        ,href: '/getting-started'
                    },{
                        text: 'Components'
                        ,href: '/component'
                    },{
                        text: 'Customize'
                        ,href: '/customize'
                    }
                ]
            },{ // header
                xtype: 'container'
                ,el: '<header>'
                ,id: 'header'
                ,items: {
                    xtype: 'container'
                    ,cls: 'container'
                }
            },{ // body
                xtype: 'container'
                ,id: 'body'
                ,cls: 'container'
            },{ // footer
                xtype: 'container'
                ,el: '<footer>'
                ,id: 'footer'
                ,items: {
                    xtype: 'container'
                    ,cls: 'container'
                    ,html: '<p>Footer</p>'
                }
            }
        ]

        ,ready: function() {
            this.on('click', 'a', function() {
                Router.navigate($(this).attr('href'), {trigger: true})
                return false
            })
        }
    })
})