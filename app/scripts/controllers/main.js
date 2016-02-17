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

    function Shuffle(o) {
    	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    	return o;
    };

    var query = ApiService.get();
    query.$promise.then(function (data) {
      $scope.members = Shuffle(data.members);
      $scope.wowData = data;

      console.log(data);
    });

  }]);
