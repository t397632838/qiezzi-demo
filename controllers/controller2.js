define(['controllers/module.js'],function(controllers){
    'use strict';
    controllers.controller('guahaoCtrl',function($rootScope,$scope,$http,$state){
        debugger;
        $scope.selectItem = [{'name':"全部"},{'name':"预约"},{'name':"挂号"}];

        if($rootScope.searchTodayPatlog&&$rootScope.searchTodayPatlog.length==0){
            $scope.loading = true;
            $timeout(function(){
                $scope.loading = ! $scope.loading;
            },800);
        }

        if(! $rootScope.searchTodayPatlog){
            $rootScope.searchTodayPatlog = [];
        }

        $scope.showDetail = function (model) {
            debugger;
            $scope.isShow = !$scope.isShow;
            $scope.patientInfo = model;
        }

        $scope.search = function(){
            if( $rootScope.searchTodayPatlog.length>0){
                var arr = []
                angular.forEach($scope.searchTodayPatlog,function(item,index){
                    if($scope.searchCondition.SearchStr == item.PatientName){
                        arr.push(item);
                    }
                });
                $rootScope.searchTodayPatlog = arr;

            }
        }

        $scope.ifShowClick = function(){
            $scope.searchCondition = {
                SearchStr :"",
                selectedBookState:""
            }
        }
    })
})