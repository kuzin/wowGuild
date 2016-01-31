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
  .controller('MainCtrl', function($scope, $http, API_KEY, REALM, GUILD, BASE_URL, $ocLazyLoad) {
    // Grab Guild API
    $http.get(BASE_URL + '/wow/guild/' + REALM +'/' + GUILD +
      '?fields=members,news&locale=en_US&apikey=' + API_KEY)
      .success(function (data) {
        $scope.guildAPI = data;
        var wowhead_tooltips = { "colorlinks": true, "iconizelinks": true, "renamelinks": true };
        $ocLazyLoad.load('//wow.zamimg.com/widgets/power.js');
    });

  });
