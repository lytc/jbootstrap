(function($) {
    $(function() {
        new jB.Navbar({
            renderTo: '#main-navbar'
            ,id: 'main-navbar'
            ,inverse: true
            ,fixed: 'top'
            ,collapsible: true
            ,brand: {
                text: 'Bootstrap JS'
                ,attr: {
                    href: '/index.html'
                }
            }
            ,nav: [
                {
                    text: 'Get Started'
                    ,href: '/getting-started.html'
                },{
                    text: 'Components'
                    ,href: '/components.html'
                },{
                    text: 'Customize'
                    ,href: '/customize.html'
                },{
                    text: 'Tests'
                    ,href: '/tests.html'
                }
            ]
        })

        Application = {}
        Application.renderCodeEditor = function(els) {
            els = arguments.length? els : $('pre.example')
            els.each(function() {
                var me = $(this)
                    ,code = '/* Try to modify code bellow to see the changes! */\n\n' + me.text().trim()
                    ,codeEditorWidth = me.data('codeEditorWidth')
                    ,previewWidth = me.data('previewWidth')
                me.empty()
//
                var tip
                    ,exampleCt = new jB.Component({
                        renderTo: this
                        ,cls: 'example clearfix'
                        ,items: {
                            xtype: 'button'
                            ,cls: 'toggle-full-screen'
                            ,type: 'link'
                            ,size: 'small'
                            ,togglable: true
                            ,icon: 'resize-full'
                            ,on: {
                                toggle: function(e, pressed) {
                                    exampleCt.toggleClass('full-screen', pressed)
                                    jB.get(this).icon().type(pressed? 'resize-small' : 'resize-full')
                                    tip.body(pressed? 'Restore Full Screen' : 'Full Screen')
                                }
                            }
                            ,ready: function() {
                                tip = new jB.Tooltip({
                                    target: this
                                    ,placement: 'right'
                                    ,css: {
                                        zIndex: 1032
                                    }
                                    ,body: 'Full Screen'
                                })
                            }
                        }
                    })
                    ,codeEditorContainerCmp = new jB.Component({
                        cls: 'editor-container'
                        ,css: {
                            float: 'left'
                            ,width: codeEditorWidth || '50%'
                        }
                    })
                    ,previewContainerCmp = new jB.Component({
                        cls: 'preview-container'
                        ,css: {
                            float: 'left'
                            ,width: previewWidth || '50%'
                        }
                    })
                    ,codeEditorCmp = new jB.Component({
                        cls: 'editor'
                        ,css: {
                            maxHeight: 300
                            ,overflow: 'auto'
                            ,border: '1px solid #e1e1e8'
                            ,borderRadius: 4
                        }
                    })
                    ,previewCmp = new jB.Component({
                        cls: 'preview'
                        ,css: {
                            marginLeft: 10
                        }
                    })
                    ,errorCmp = new jB.Alert({
                        type: 'error'
                        ,css: {
                            marginLeft: 10
                            ,display: 'none'
                        }
                    })

                codeEditorContainerCmp.append(codeEditorCmp)
                previewContainerCmp.append([errorCmp, previewCmp])

                exampleCt.append([codeEditorContainerCmp, previewContainerCmp])


                function render() {
                    try {
                        var cmp = eval(codeEditor.getValue())
                        previewCmp.empty().append(cmp)
                        errorCmp.hide()
                    } catch (e) {
                        errorCmp.show().text(e.toString())
                        throw e
                    }

                }

                function debounce(func, wait, immediate) {
                    var timeout, result;
                    return function() {
                        var context = this, args = arguments;
                        var later = function() {
                            timeout = null;
                            if (!immediate) result = func.apply(context, args);
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) result = func.apply(context, args);
                        return result;
                    };
                }

                var renderDebounced = debounce(render, 500)
                    ,codeEditor = CodeMirror(codeEditorCmp.el.get(0), {
                        mode: 'javascript'
                        ,lineNumbers: true
                        ,indentUnit: 4
                        ,value: code
                    })

                codeEditor.on('change', renderDebounced)
                renderDebounced()
            })
        }

        Application.renderCodeEditor()
    })
})(jQuery)