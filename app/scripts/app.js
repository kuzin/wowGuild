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
    'hc.marked',
    'tien.clndr',
    'oc.lazyLoad',
    'backand',
    'ngSanitize',
    'markdown'
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    function route (template, ctrl, path) {
      $routeProvider.when(path, {
        templateUrl: 'views/' + template + '.html',
        controller: ctrl
      });
    }

    // Main Routes
    route('main',     'MainCtrl',    '/');
    route('roster',   'MainCtrl',    '/roster');
    route('about',    'MainCtrl',    '/about');
    route('404',      'MainCtrl',    '/404');
    route('blog' ,    'BlogCtrl',    '/blog');
    route('calendar', 'CalCtrl',     '/calendar');
    route('apply',    'MainCtrl',    '/apply');

    // 404
    $routeProvider.otherwise({ redirectTo: '/404' });
    // $locationProvider.html5Mode(true);

  }])
  .config(function (BackandProvider) {
      BackandProvider.setAppName('wowapi');
      BackandProvider.setSignUpToken('27133402-39d7-4c22-9161-98fe93fce4b1');
      BackandProvider.setAnonymousToken('e3b8a7c6-a2b1-4661-b467-c3e62257a852');
  });

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
  .directive('autoActive', ['$location', function ($location) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element) {
                function setActive() {
                    var path = $location.path();
                    if (path) {
                        angular.forEach(element.find('li'), function (li) {
                            var anchor = li.querySelector('a');
                            if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                angular.element(li).addClass('active');
                            } else {
                                angular.element(li).removeClass('active');
                            }
                        });
                    }
                }

                setActive();

                scope.$on('$locationChangeSuccess', setActive);
            }
        }
    }]);
