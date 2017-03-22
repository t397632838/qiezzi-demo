define(["angular",'mainController/mainController','bootstrap','ocLazyLoad'],function(angular){
    return angular.module("webapp",['ui.router','webapp.controllers','ui.bootstrap','oc.lazyLoad']);
})