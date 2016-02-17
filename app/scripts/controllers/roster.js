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
  .controller('RosterCtrl', ['$scope', 'ApiService', function($scope, ApiService) {

      $scope.sortType     = 'character.name'; // set the default sort type
      $scope.sortReverse  = false;  // set the default sort order
      $scope.searchFish   = '';

    var query = ApiService.get();
    query.$promise.then(function (data) {
      $scope.members = data.members;
    });

  }]);
