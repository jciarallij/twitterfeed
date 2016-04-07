var viewsApp = angular.module('viewsApp', ['ngRoute', 'ngAnimate']);

viewsApp.config(function($routeProvider){
	////// Route Handlers //////
	$routeProvider.when(
		'/:template', 
		{
			controller: 'viewsController',
			templateUrl: function($routeParams){
				// console.log($routeParmas.template);
				return 'template' + $routeParams.template + '.html';
		}
		
	});

	$routeProvider.otherwise({
		redirectTo: '/0',
	});
	//////End Route Handlers //////
	
});


viewsApp.controller('viewsController', function($scope, $location){

	$scope.nextId = function(id){
		console.log(id);
		$location.path("#/" + id);
	}

});