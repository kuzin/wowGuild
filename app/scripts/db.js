'use strict';

/**
 * @ngdoc overview
 * @name wowApp
 * @description
 * # wowApp
 *
 * Main module of the application.
 */

angular
  .module('wowApp')
  .service('service', function(pouchDB, DB) {
    var db = pouchDB(DB);
  });
