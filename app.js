'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'newcapital.signIn',
  'newcapital.signUp',
  'newcapital.todo'
]).
config(['$routeProvider','$locationProvider', function( $routeProvider, $locationProvider ) {
	$locationProvider.html5Mode(true);
	$routeProvider.otherwise({redirectTo: '/sign_in'});
}]);
