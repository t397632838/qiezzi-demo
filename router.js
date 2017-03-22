define(["app"], function (app) {
    return app.run([
        '$rootScope',   
        '$state',
        '$stateParams',
        '$modal',
        function ($rootScope, $state, $stateParams,$modal) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$modal = $modal;
        }
    ])
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
            $stateProvider
                .state('todayWork', {
                    url: '/todayWork',
                    templateUrl: './html/topMenus.html',
                    controller: function ($scope,$state) {
                        $scope.statistics = {
                            todayBookingArrivedPatientAmount: 0,
                            todayBookingPatientAmount: 0,
                            todayPatlogPatientAmount: 0,
                            todayVisitedPatientAmount: 0,
                            addedPatientAmount:0
                        }
                        $scope.addedPatientAmount = 0;
                        
                        $scope.clickTodayNew = function (state) {
                            if(state===0){
                                $state.go('todayWork.yuyue');
                            }
                            if(state===1){
                                $state.go('todayWork.guhao');
                            }
                            if(state===2){
                                $state.go('todayWork.jiuzhen');
                            }
                            if(state===3){
                                $state.go('todayWork.xinhuanzhe');
                            }
                            $scope.SelectedToday = state;
                        }
                        var createPatlogCtrl = function($scope,$modalInstance){
                            $scope.cancel = function () {
                                $modalInstance.close();
                            }

                            $scope.save = function(theForm){
                                if(!theForm.$valid){
                                    return;
                                }
                                if(!$scope.searchTodayPatlog){
                                    $scope.searchTodayPatlog = $scope.model;
                                }else{
                                    $scope.searchTodayPatlog.push($scope.model);
                                }

                                $scope.statistics.todayPatlogPatientAmount = $scope.searchTodayPatlog.length;

                                $scope.cancel();
                            }
                        }

                        $scope.createPatlog = function () {
                            $scope.$modal.open({
                                templateUrl:"./html/createPatlog.html",
                                controller: createPatlogCtrl,
                                scope : $scope,
                                backdrop:'static'
                            });
                        }

                        var createPatientCtrl = function ($scope,$modalInstance) {
                            $scope.Provinces = [{'ProvinceName':"北京市"}];
                            $scope.Cties = [{'CityName':"北京市"},{'CityName':"西城区"},{'CityName':"东城区"},{'CityName':"海淀区"}];
                            $scope.Areas = [{'AreaName':"西直门"},{'AreaName':"东直门"},{'AreaName':"王府井"},{'AreaName':"小西天"}];

                            $scope.cancel = function () {
                                $modalInstance.close();
                            }

                            $scope.ok = function(theForm){
                                if(!theForm.$valid){
                                    return;
                                }
                                if(!$scope.searchTodayVisitedPatient){
                                    $scope.searchTodayVisitedPatient = $scope.model;
                                }else{
                                    $scope.searchTodayVisitedPatient.push($scope.model);
                                }

                                $scope.statistics.addedPatientAmount += 1;

                                $scope.cancel();
                            }
                        }

                        $scope.createPatient = function () {
                            $scope.$modal.open({
                                templateUrl:"./html/createPatient.html",
                                controller: createPatientCtrl,
                                scope : $scope,
                                backdrop:'static'
                            });
                        }

                    }
                })
                .state('todayWork.yuyue', {
                    templateUrl: './html/yuyue.html',
                    controller:function ($scope,$timeout) {
                        $scope.loading = true;
                        $timeout(function(){
                            $scope.loading = ! $scope.loading;
                        },800);
                        $scope.searchTodayBooks = [];
                    }
                })
                .state('todayWork.guhao', {
                    templateUrl: './html/guahao.html',
                    controller: 'guahaoCtrl',
                    // resolve: {
                    //     loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    //         debugger;
                    //         return $ocLazyLoad.load('./controllers/controller2');
                    //     }]
                    // }


                    // controller:function ($rootScope,$scope,$timeout) {
                    //     $scope.selectItem = [{'name':"全部"},{'name':"预约"},{'name':"挂号"}];
                    //
                    //     if($rootScope.searchTodayPatlog&&$rootScope.searchTodayPatlog.length==0){
                    //         $scope.loading = true;
                    //         $timeout(function(){
                    //             $scope.loading = ! $scope.loading;
                    //         },800);
                    //     }
                    //
                    //     if(! $rootScope.searchTodayPatlog){
                    //         $rootScope.searchTodayPatlog = [];
                    //     }
                    //
                    //     $scope.showDetail = function (model) {
                    //         debugger;
                    //         $scope.isShow = !$scope.isShow;
                    //         $scope.patientInfo = model;
                    //     }
                    //
                    //     $scope.search = function(){
                    //         if( $rootScope.searchTodayPatlog.length>0){
                    //             var arr = []
                    //             angular.forEach($scope.searchTodayPatlog,function(item,index){
                    //                 if($scope.searchCondition.SearchStr == item.PatientName){
                    //                     arr.push(item);
                    //                 }
                    //             });
                    //             $rootScope.searchTodayPatlog = arr;
                    //
                    //         }
                    //     }
                    //
                    //     $scope.ifShowClick = function(){
                    //         $scope.searchCondition = {
                    //             SearchStr :"",
                    //             selectedBookState:""
                    //         }
                    //     }
                    //
                    // }
                })
                .state('todayWork.jiuzhen', {
                    templateUrl: './html/jiuzhen.html',
                    controller:function ($scope,$timeout) {
                        $scope.loading = true;
                        $timeout(function(){
                            $scope.loading = ! $scope.loading;
                        },800);
                        $scope.searchTodayVisitedPatient = [];
                    }
                })
                .state('todayWork.xinhuanzhe', {
                    templateUrl: './html/xinhuanzhe.html',
                    controller:function ($rootScope,$scope,$timeout) {
                        if($rootScope.searchTodayVisitedPatient&&$rootScope.searchTodayVisitedPatient.length==0){
                            $scope.loading = true;
                            $timeout(function(){
                                $scope.loading = ! $scope.loading;
                            },800);
                        }
                        if(! $rootScope.searchTodayVisitedPatient){
                            $rootScope.searchTodayVisitedPatient = [];
                        }

                        $scope.showDetail = function (model) {
                            debugger;
                            $scope.isShow = !$scope.isShow;
                            $scope.patientInfo = model;
                        }
                    }
                })
                .state('other', {
                    ulr: 'other',
                    templateUrl: './html/other.html',
                });
        })
})