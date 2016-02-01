'use strict';

/**
 * @ngdoc API
 * @name wowApp
 * @description
 * # wowApp
 *
 * Main module of the application.
 */

angular.module('wowApp')
  .factory('ApiService', ['$http', function ($http) {
    return {
      get : function () {
        return $http.get('/api');
      },
      create : function (data) {
        return $http.post('/api', data);
      },
      delete : function (id) {
        return $http.delete('/api/', + id);
      }
    }
  }]);
