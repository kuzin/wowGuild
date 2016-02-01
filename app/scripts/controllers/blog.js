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
