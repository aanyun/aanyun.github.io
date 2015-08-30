'use strict';

angular.module('newcapital.signIn', ['ngRoute','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sign_in', {
    templateUrl: 'signIn/view.html',
    controller: 'SignInCtrl'
  });
}])

.controller('SignInCtrl', function( $scope, $http, $location, $cookies ) {

	$scope.submitForm = function(isValid) {
		angular.forEach($scope.userForm.$error.required, function(field) {
		    field.$setDirty();
		});
		$scope.errorMessage = null;
	    if (isValid) {
	    	$scope.loading = true;
	        $http({
	        	method:'post',
	        	url:'http://recruiting-api.nextcapital.com/users/sign_in',
	        	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        	data:$.param({
	        		email: $scope.user.email,
		            password: $scope.user.password	            
		        })
	        }).then(
	        function (data) {
	        	$scope.loading = false;
	        	$cookies.put('token', data.data.api_token);
	        	$cookies.put('user_email', data.data.email);
	        	$location.path( "/todo/"+data.data.id );
	        },function (data){
	        	$scope.loading = false;
	        	$scope.errorMessage = data.data.error;
	        });
	    } 
	  };
});