'use strict';

angular.module('newcapital.todo', ['ngRoute','newcapital.todoSrv','ui.sortable','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/todo/:idUser', {
    templateUrl: 'todo/view.html',
    controller: 'todoCtrl'
  });
}])

.controller('todoCtrl', function($scope, $http, $cookies, $location, $routeParams, TodoFactory) {
	$scope.todos = [];
	$scope.user_email = $cookies.get('user_email');
	$scope.incompleteOnly = -1;

	TodoFactory.getAll($routeParams.idUser).then(function(data){
		$scope.todos = data;
	},function(error){
		alert(error);
	});

	$scope.getDetail = function(id){
		TodoFactory.get($routeParams.idUser,id).then(function(data){
			console.log(data);
		},function(error){
			//alert(error);
		});
	}

	$scope.getDetail(3269);

	$scope.add = function(isValid){
		if (isValid) {
	    	$scope.loading = true;
	    	var data = {
	    		description:$scope.des
	    	};
	    	TodoFactory.add($routeParams.idUser,data).then(function(data){
	    		$scope.loading = false;
	    		$scope.todos.push(data);
	    		$scope.des = null;
	    		$scope.todoForm.$setPristine();
			},function(error){
				$scope.loading = false;
			});
	    }
	}

	$scope.update = function(todo){
		todo.is_complete = !todo.is_complete;
	    TodoFactory.update($routeParams.idUser,todo).then(function(data){
		},function(error){
		});
	}

	$scope.edit = function(todo){
		todo.editing = true;
		todo.newDes = todo.description;
	}

	$scope.cancel = function(todo){
		todo.editing = false;
		todo.newDes = null;
	}

	$scope.save = function(todo){
		todo.description = todo.newDes;
		TodoFactory.update($routeParams.idUser,todo).then(function(data){
			todo.editing = false;
			todo.newDes = null;
		},function(error){
		});
		
	}

	$scope.delete = function(todo){
		$scope.todos.splice($scope.todos.indexOf(todo),1);
	}

	$scope.signOut = function(){
		$http({
			method: 'delete',
			headers: {'Content-Type': 'application/json'},
			url: "http://recruiting-api.nextcapital.com/users/sign_out",
			data:{
        		api_token: $cookies.get('token'),
	            user_id: $routeParams.idUser            
		    }
		})
		.then(function(result){
			$location.path('/signIn');
		},function(error){
			$location.path('/signIn');
			$cookies.remove('token');
			console.log(error);
		});		
	}

	var fixHelper = function(e, ui) {
	  ui.children().each(function() {
	    $(this).width($(this).width());
	  });
	  return ui;
	};

	$scope.sortableOptions = {
	  helper: fixHelper,
	};
}).filter('cusFilter', function() {
	return function(input, incompleteOnly) {
		if(incompleteOnly !=-1){
	  	var out = [];
			for (var i = 0; i < input.length; i++){
			  	if(input[i].is_complete != incompleteOnly)
			    	out.push(input[i]);
			}      
	    return out;
		} else {
			return input;
		}

	};
});