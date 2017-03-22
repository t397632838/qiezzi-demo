define(['controllers/module.js'],function(controllers){
    'use strict';
    controllers.controller('frameworkService',function($rootScope,$scope,$http,$state){
        $http.get("data.json").success(function(data){
            if(data){
                $rootScope.adminNav = data.adminNav;
                $rootScope.banners = data.banners;
            }
        })
        $scope.leftMenus = "./html/leftMenus.html";

        $scope.open = function (url) {
            debugger;
            if(url=="todayWork"){
                $state.go(url);
            }else {
                $state.go("other");
            }
        }
    })
})