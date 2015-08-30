'use strict';

angular.module('newcapital.signUp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sign_up', {
    templateUrl: 'signUp/view.html',
    controller: 'SignUpCtrl'
  });
}])

.controller('SignUpCtrl', function( $scope, $cookies, $http, $location ) {

	$scope.submitForm = function(isValid) {
		$scope.errorMessage = null;
		angular.forEach($scope.userForm.$error.required, function(field) {
		    field.$setDirty();
		});
	    // check to make sure the form is completely valid
	    if (isValid) {
	    	$scope.loading = true;
	        $http({
	        	method:'post',
	        	url:'http://recruiting-api.nextcapital.com/users',
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
	        	var errors = angular.fromJson(data.data);
	        	$scope.errorMessage = [];
	        	angular.forEach($scope.user, function(value,field) {
				    if (errors[field]){
				    	angular.forEach(errors[field], function(error) {
					    	$scope.errorMessage.push(field + " " + error);
					    });
				    }	
				});
	        });
	    }

	};
});