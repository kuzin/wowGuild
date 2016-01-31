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
  .module('wowApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngOrderObjectBy',
    'processIDFilter',
    'angularMoment',
    'angularUtils.directives.dirPagination',
    'oc.lazyLoad',
    'pouchdb',
    'hc.marked',
    'tien.clndr'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    function route (template, ctrl, path) {
      $routeProvider.when(path, {
        templateUrl: 'views/' + template + '.html',
        controller: ctrl
      });
    }

    // Main Routes
    route('main',     'MainCtrl',    '/');
    route('posts',    'DraftsCtrl',  '/blog/drafts');
    route('posts',    'PostCtrl',    '/blog/post/:id');
    route('posts',    'PostsCtrl',   '/blog');
    route('new',      'EditCtrl',    '/blog/edit/:id');
    route('new',      'NewCtrl',     '/blog/new');
    route('roster',   'MainCtrl',    '/roster');
    route('about',    'MainCtrl',    '/about');
    route('404',      'MainCtrl',    '/404');
    route('register', 'RegCtrl',     '/blog/register');
    route('login',    'LoginCtrl',   '/blog/login');
    route('calendar', 'CalCtrl',     '/calendar');
    route('apply',    'MainCtrl',    '/apply');

    // 404
    $routeProvider.otherwise({ redirectTo: '/404' });

  }]);

angular
  .module('processIDFilter', []).filter('processID', function() {
    return function(input) {
      var re  = /-avatar\.[^.]+$/,
          str = input.toString(),
          subst = '',
          result = str.replace(re, subst);

      return result;
    };

  });


angular
  .module('wowApp')
  .directive('ngShowYear', ['$filter', function ($filter) {
    return {
      link: function($scope, $element) {
        $element.text($filter('date')(new Date(), 'yyyy'));
      }
    }
  }])
