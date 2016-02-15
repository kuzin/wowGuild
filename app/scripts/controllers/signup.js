'use strict';
(function () {
/**
 * @ngdoc function
 * @name todoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Backand login control - need to implement in order to get the token for authentication
 */

angular.module('wowApp')
    .controller('LoginCtrl', ['$scope', 'AuthService',
      function($scope, AuthService) {

      // Default Error States
      $scope.error = null;
      $scope.success = null;

      $scope.signup = function () {

        console.log('signup-running');

        AuthService.signup(
            $scope.username,
            $scope.email,
            $scope.password)
            .then(function (response) {

              // check status of signin
              switch (response.data.currentStatus) {
                case 1:
                  console.log('user is ready to signin')
                case 2:
                  console.log('system is now waiting for the user to respond to a verification email');
                  $scope.success = 'Please check your email to continue';
                case 3:
                  console.log('The user signed up and is now waiting for an administrator approval.')
              }

            }, showError
          );

          function showError(error) {
            $scope.error = error && error.data || error.error_description || 'Unknown error from server';
          }



      };




    }]);

})();
