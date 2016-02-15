'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 *
 * Controller of the wowApp
 */

angular
  .module('wowApp')
  .controller('MainCtrl', ['$scope', 'ApiService', function($scope, ApiService) {
    $scope.wowData = ApiService.get();
  }]);
