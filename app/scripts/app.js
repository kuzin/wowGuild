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
    'hc.marked',
    'tien.clndr',
    'backand',
    'ngSanitize',
    'markdown',
    'ui.bootstrap',
    'angularLoad'
  ])
  .config(function (BackandProvider, APP_NAME, BACKAND_TOKEN, BACKAND_SECRET) {
      BackandProvider.setAppName(APP_NAME);
      BackandProvider.setSignUpToken(BACKAND_TOKEN);
      BackandProvider.setAnonymousToken(BACKAND_SECRET);
  })
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
    route('post',     'PostCtrl',    '/blog/post');
    route('signup',   'LoginCtrl',    '/signup');

    // 404
    $routeProvider.otherwise({ redirectTo: '/404' });
    // $locationProvider.html5Mode(true);

  }]);

angular
  .module('processIDFilter', []).filter('processID', function () {
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
