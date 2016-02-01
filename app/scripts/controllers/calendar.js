'use strict';

/**
 * @ngdoc function
 * @name wowApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wowApp
 */

angular.module('wowApp')
  .controller('CalCtrl', function ($scope, $log, $http) {
    $scope.$log = $log;

    $scope.options = {
        multiDayEvents: {
          endDate: 'end',
          singleDay: 'date',
          startDate: 'start'
      }
    }

    $http.get('data/cal.ics').success(function(response) {

      var jCalData = ICAL.parse(response);
      var comp = new ICAL.Component(jCalData[2]);

      $scope.events = [];

      var i;

      for (i = 0; i < comp.jCal.length; i++) {
        var data = comp.jCal[i][1];
        $scope.events.push({
          title : data[6][3],
          start : new Date(data[3][3]).getTime(),
          end   : new Date(data[4][3]).getTime(),
          organizer : data[9][3],
          location : data[8][3],
          description : data[7][3]
        });
      }

    });
  });
