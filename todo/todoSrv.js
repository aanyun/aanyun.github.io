angular.module('newcapital.todoSrv', ['ngCookies'])

.factory('TodoFactory', function($location, $rootScope, $q, $http, $cookies) {
	function get(user_id,id){
		var token = $cookies.get('token');
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: API_LINK+"/users/"+user_id+"/todos/"+id,
			params:{
				api_token:token
			}
		})
		.then(function(response){
			deferred.resolve(response.data);
		},function(response){
			deferred.reject(response.data.error);
		});		
		return deferred.promise;
	}
	function getAll(id){
		var token = $cookies.get('token');
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: API_LINK+"/users/"+id+"/todos",
			headers:{
				api_token:token
			}
		})
		.then(function(response){
			deferred.resolve(response.data);
		},function(response){
			if(response.status==400){
				$location.path('/signIn');
			}
			deferred.reject(response.data.error);
		});		
		return deferred.promise;
	}
	function add(id,todo){
		var token = $cookies.get('token');
		var deferred = $q.defer();
		$http({
			method: 'post',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			url: API_LINK+"/users/"+id+"/todos",
			data:$.param({
        		api_token: token,
	            todo: todo            
		    })
		})
		.then(function(result){
			deferred.resolve(result.data);
		},function(error){
			deferred.reject(error);
		});		
		return deferred.promise;
	}
	function update(id,todo){
		var token = $cookies.get('token');
		var deferred = $q.defer();
		$http({
			method: 'put',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			url: API_LINK+"/users/"+id+"/todos/"+todo.id,
			data:$.param({
        		api_token: token,
	            todo: todo            
		    })
		})
		.then(function(result){
			deferred.resolve(result.data);
		},function(error){
			deferred.reject(error);
		});		
		return deferred.promise;
	}
	return {
		get: get,
		getAll: getAll,
		add: add,
		update: update
	}
});