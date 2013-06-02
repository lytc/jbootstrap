
'jquery,constructor,init,selector,length,size,toArray,get,pushStack,each,ready,slice,first,last,eq,map,end,push,sort,\
plice,extend,data,removeData,queue,dequeue,delay,clearQueue,promise,attr,removeAttr,prop,removeProp,addClass,\
removeClass,toggleClass,hasClass,val,on,one,off,bind,unbind,delegate,undelegate,trigger,triggerHandler,find,has,not,\
filter,is,closest,index,add,addBack,andSelf,parent,parents,parentsUntil,next,prev,nextAll,prevAll,nextUntil,prevUntil,\
siblings,children,contents,text,wrapAll,wrapInner,wrap,unwrap,append,prepend,before,after,remove,empty,clone,html,\
replaceWith,detach,domManip,appendTo,prependTo,insertBefore,insertAfter,replaceAll,css,show,hide,toggle,serialize,\
serializeArray,blur,focus,focusin,focusout,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,\
mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error,contextmenu,hover,ajaxStart,\
ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend,fadeTo,animate,stop,finish,slideDown,slideUp,slideToggle,fadeIn,\
fadeOut,fadeToggle,offset,position,offsetParent,scrollLeft,scrollTop,innerHeight,height,outerHeight,innerWidth,width,outerWidth'

// for jB
// queue

// for container
// size toArray get each first last end children

// for component collection
// size toArray pushStack slice map push sort splice promise has not filter add addBack wrapAll wrapInner append prepend empty

var fns = keys($.fn)
    , data = {}
    , name
    , excludes = 'jquery constructor init selector length size toArray get pushStack each ready slice first last eq \
                map end push sort splice extend queue dequeue clearQueue promise has not filter add addBack children \
                append prepend domManip bind unbind delegate undelegate find addSelf error\
                '.split(' ')

for (var i = 0, len = fns.length; i < len; ++i) {
    name = fns[i]

    if (-1 !== excludes.indexOf(name)) {
        continue
    }
    data[fns[i]] = {get: true, set: true, setter: true}
}

console.dir(JSON.stringify(data).replace(/"(\w+)":/g, "$1:"))

fns = {
    data: {
        fallback: true,
        setter: true,
        override: false
    },
    removeData: {
        fallback: true,
        setter: true,
        override: false
    },
    delay: {
        fallback: true,
        setter: true,
        override: false
    },
    attr: {
        fallback: true,
        setter: true,
        override: false
    },
    removeAttr: {
        fallback: true,
        setter: true,
        override: false
    },
    prop: {
        fallback: true,
        setter: true,
        override: false
    },
    removeProp: {
        fallback: true,
        setter: true,
        override: false
    },
    addClass: {
        fallback: true,
        setter: true,
        override: false
    },
    removeClass: {
        fallback: true,
        setter: true,
        override: false
    },
    toggleClass: {
        fallback: true,
        setter: true,
        override: false
    },
    hasClass: {
        fallback: true,
        setter: true,
        override: false
    },
    val: {
        fallback: true,
        setter: true,
        override: false
    },
    on: {
        fallback: true,
        setter: true,
        override: false
    },
    one: {
        fallback: true,
        setter: true,
        override: false
    },
    off: {
        fallback: true,
        setter: true,
        override: false
    },
    bind: {
        fallback: true,
        setter: true,
        override: false
    },
    unbind: {
        fallback: true,
        setter: true,
        override: false
    },
    delegate: {
        fallback: true,
        setter: true,
        override: false
    },
    undelegate: {
        fallback: true,
        setter: true,
        override: false
    },
    trigger: {
        fallback: true,
        setter: true,
        override: false
    },
    triggerHandler: {
        fallback: true,
        setter: true,
        override: false
    },
    find: {
        fallback: true,
        setter: true,
        override: false
    },
    is: {
        fallback: true,
        setter: true,
        override: false
    },
    closest: {
        fallback: true,
        setter: true,
        override: false
    },
    index: {
        fallback: true,
        setter: true,
        override: false
    },
    andSelf: {
        fallback: true,
        setter: true,
        override: false
    },
    parent: {
        fallback: true,
        setter: true,
        override: false
    },
    parents: {
        fallback: true,
        setter: true,
        override: false
    },
    parentsUntil: {
        fallback: true,
        setter: true,
        override: false
    },
    next: {
        fallback: true,
        setter: true,
        override: false
    },
    prev: {
        fallback: true,
        setter: true,
        override: false
    },
    nextAll: {
        fallback: true,
        setter: true,
        override: false
    },
    prevAll: {
        fallback: true,
        setter: true,
        override: false
    },
    nextUntil: {
        fallback: true,
        setter: true,
        override: false
    },
    prevUntil: {
        fallback: true,
        setter: true,
        override: false
    },
    siblings: {
        fallback: true,
        setter: true,
        override: false
    },
    contents: {
        fallback: true,
        setter: true,
        override: false
    },
    text: {
        fallback: true,
        setter: true,
        override: false
    },
    wrapAll: {
        fallback: true,
        setter: true,
        override: false
    },
    wrapInner: {
        fallback: true,
        setter: true,
        override: false
    },
    wrap: {
        fallback: true,
        setter: true,
        override: false
    },
    unwrap: {
        fallback: true,
        setter: true,
        override: false
    },
    before: {
        fallback: true,
        setter: true,
        override: false
    },
    after: {
        fallback: true,
        setter: true,
        override: false
    },
    remove: {
        fallback: true,
        setter: true,
        override: false
    },
    empty: {
        fallback: true,
        setter: true,
        override: false
    },
    clone: {
        fallback: true,
        setter: true,
        override: false
    },
    html: {
        fallback: true,
        setter: true,
        override: false
    },
    replaceWith: {
        fallback: true,
        setter: true,
        override: false
    },
    detach: {
        fallback: true,
        setter: true,
        override: false
    },
    appendTo: {
        fallback: true,
        setter: true,
        override: false
    },
    prependTo: {
        fallback: true,
        setter: true,
        override: false
    },
    insertBefore: {
        fallback: true,
        setter: true,
        override: false
    },
    insertAfter: {
        fallback: true,
        setter: true,
        override: false
    },
    replaceAll: {
        fallback: true,
        setter: true,
        override: false
    },
    css: {
        fallback: true,
        setter: true,
        override: false
    },
    show: {
        fallback: true,
        setter: true,
        override: false
    },
    hide: {
        fallback: true,
        setter: true,
        override: false
    },
    toggle: {
        fallback: true,
        setter: true,
        override: false
    },
    serialize: {
        fallback: true,
        setter: true,
        override: false
    },
    serializeArray: {
        fallback: true,
        setter: true,
        override: false
    },
    blur: {
        fallback: true,
        setter: true,
        override: false
    },
    focus: {
        fallback: true,
        setter: true,
        override: false
    },
    focusin: {
        fallback: true,
        setter: true,
        override: false
    },
    focusout: {
        fallback: true,
        setter: true,
        override: false
    },
    load: {
        fallback: true,
        setter: true,
        override: false
    },
    resize: {
        fallback: true,
        setter: true,
        override: false
    },
    scroll: {
        fallback: true,
        setter: true,
        override: false
    },
    unload: {
        fallback: true,
        setter: true,
        override: false
    },
    click: {
        fallback: true,
        setter: true,
        override: false
    },
    dblclick: {
        fallback: true,
        setter: true,
        override: false
    },
    mousedown: {
        fallback: true,
        setter: true,
        override: false
    },
    mouseup: {
        fallback: true,
        setter: true,
        override: false
    },
    mousemove: {
        fallback: true,
        setter: true,
        override: false
    },
    mouseover: {
        fallback: true,
        setter: true,
        override: false
    },
    mouseout: {
        fallback: true,
        setter: true,
        override: false
    },
    mouseenter: {
        fallback: true,
        setter: true,
        override: false
    },
    mouseleave: {
        fallback: true,
        setter: true,
        override: false
    },
    change: {
        fallback: true,
        setter: true,
        override: false
    },
    select: {
        fallback: true,
        setter: true,
        override: false
    },
    submit: {
        fallback: true,
        setter: true,
        override: false
    },
    keydown: {
        fallback: true,
        setter: true,
        override: false
    },
    keypress: {
        fallback: true,
        setter: true,
        override: false
    },
    keyup: {
        fallback: true,
        setter: true,
        override: false
    },
    error: {
        fallback: true,
        setter: true,
        override: false
    },
    contextmenu: {
        fallback: true,
        setter: true,
        override: false
    },
    hover: {
        fallback: true,
        setter: true,
        override: false
    },
    ajaxStart: {
        fallback: true,
        setter: true,
        override: false
    },
    ajaxStop: {
        fallback: true,
        setter: true,
        override: false
    },
    ajaxComplete: {
        fallback: true,
        setter: true,
        override: false
    },
    ajaxError: {
        fallback: true,
        setter: true,
        override: false
    },
    ajaxSuccess: {
        fallback: true,
        setter: true,
        override: false
    },
    ajaxSend: {
        fallback: true,
        setter: true,
        override: false
    },
    fadeTo: {
        fallback: true,
        setter: true,
        override: false
    },
    animate: {
        fallback: true,
        setter: true,
        override: false
    },
    stop: {
        fallback: true,
        setter: true,
        override: false
    },
    finish: {
        fallback: true,
        setter: true,
        override: false
    },
    slideDown: {
        fallback: true,
        setter: true,
        override: false
    },
    slideUp: {
        fallback: true,
        setter: true,
        override: false
    },
    slideToggle: {
        fallback: true,
        setter: true,
        override: false
    },
    fadeIn: {
        fallback: true,
        setter: true,
        override: false
    },
    fadeOut: {
        fallback: true,
        setter: true,
        override: false
    },
    fadeToggle: {
        fallback: true,
        setter: true,
        override: false
    },
    offset: {
        fallback: true,
        setter: true,
        override: false
    },
    position: {
        fallback: true,
        setter: true,
        override: false
    },
    offsetParent: {
        fallback: true,
        setter: true,
        override: false
    },
    scrollLeft: {
        fallback: true,
        setter: true,
        override: false
    },
    scrollTop: {
        fallback: true,
        setter: true,
        override: false
    },
    innerHeight: {
        fallback: true,
        setter: true,
        override: false
    },
    height: {
        fallback: true,
        setter: true,
        override: false
    },
    outerHeight: {
        fallback: true,
        setter: true,
        override: false
    },
    innerWidth: {
        fallback: true,
        setter: true,
        override: false
    },
    width: {
        fallback: true,
        setter: true,
        override: false
    },
    outerWidth: {
        fallback: true,
        setter: true,
        override: false
    }
}