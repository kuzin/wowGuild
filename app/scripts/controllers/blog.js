'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wowApp
 */

angular
  .module('wowApp')
  .controller('NewsCtrl', function($scope, ApiService, NewsService, filterFilter, angularLoad) {
    //
    // var queryTwo = ApiService.get();
    //
    // queryTwo.$promise.then(function (data) {
    //   // console.log(data.members, filterFilter(data.members, {'name' : 'Tukao'}));
    // })


    var query = NewsService.get();

    $scope.results == true;

    query.$promise.then(function (data) {
      $scope.newslog = data.news;

      $scope.search = {};

      $scope.resetFilters = function () {
    		$scope.search = {};
    	};

      $scope.currentPage = 1;
    	$scope.totalItems = $scope.newslog.length;
    	$scope.entryLimit = 5; // items per page
    	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);;

      $scope.$watch('search', function (newVal, oldVal) {
    		$scope.filtered = filterFilter($scope.newslog, newVal);
    		$scope.totalItems = $scope.filtered.length;
    		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    		$scope.currentPage = 1;
        setTimeout(function() {
          $WowheadPower.refreshLinks();
        }, 1);
        console.log($scope.totalItems);
        if ($scope.totalItems == 0) {
          $scope.results == true;
          console.log('true');
        }
    	}, true);

      $scope.$watch('currentPage', function(newPage){
        setTimeout(function() {
          $WowheadPower.refreshLinks();
        }, 1);
      });

      setTimeout(function() {
        $WowheadPower.refreshLinks();
      }, 1);
    });
  })

  .controller('BlogCtrl', function ($scope, $log, $http, Backand) {

    $scope.$log = $log;

     var opts =  {
       pageSize: 20,
       pageNumber: 1,
       filter: null,
       sort: ''
     };
     $http.get(Backand.getApiUrl() + '/1/objects/posts', opts).success(function (data) {
       $scope.posts = data;
     });


  })
  .controller('PostCtrl', function ($route, $scope, $http, Backand, $location) {

    $scope.title = '';
    $scope.date = '';
    $scope.content = '';
    $scope.imageUrl = '';

    $scope.postBlog = function () {
      var data = {
        title: $scope.title,
        date: new Date(),
        content: $scope.content,
        image: $scope.imageUrl
      };
      $http.post(Backand.getApiUrl() + '/1/objects/posts', data).success(function(data, status) {
        $location.path('/#/blog');
      });
    };
  });
