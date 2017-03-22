require.config({
    paths:{
        //一些库文件
        'angular': './js/angular',
        'angular-route': './js/angular-ui-router.min',
        'ocLazyLoad': './js/ocLazyLoad',
        // 'domReady': '//cdn.staticfile.org/require-domReady/2.0.1/domReady.min',
        // //js文件
        'boot': "boot",
        'bootstrap': "./js/ui-bootstrap-tpls.min",
        'app': "app",
        'router': "router",
        'mainController':"./controllers"
},
shim:{
    'angular':{
        exports:'angular'
    },
    'angular-route':{
        deps:['angular'],
            exports: 'angular-route'
    },
    'bootstrap':{
        deps:['angular'],
            exports: 'bootstrap'
    },
    'ocLazyLoad':{
        deps:['angular'],
            exports: 'ocLazyLoad'
    },
},
deps:['boot'],
    urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
});

