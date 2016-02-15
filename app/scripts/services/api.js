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
  .factory('ApiService',
    function ($resource, API_KEY, REALM, GUILD, BASE_URL) {
      return $resource(BASE_URL + '/wow/guild/' + REALM +'/' + GUILD +'?fields=members&locale=en_US&apikey=' + API_KEY);
    }
  )
  .factory('NewsService',
    function ($resource, API_KEY, REALM, GUILD, BASE_URL) {
      return $resource(BASE_URL + '/wow/guild/' + REALM +'/' + GUILD +'?fields=news&locale=en_US&apikey=' + API_KEY);
    }
  );
