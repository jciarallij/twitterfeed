var tweetApp = angular.module('tweetApp', ['ngRoute', 'ngAnimate']);

tweetApp.config(function($routeProvider){
	////// Route Handlers //////
	$routeProvider.when('/:page',{
			controller: 'mainController',
			templateUrl: 'pagelolesports.html'
		});

	$routeProvider.otherwise({
		redirectTo: '/NALCS',
	});
	//////End Route Handlers //////
	
});

tweetApp.controller('mainController', function($scope, $http, $routeParams, $interval, $location){

	var leagueDivisons = '/NALCS';
	if( 'page' in $routeParams){
		leagueDivisons = $routeParams.page;
		console.log(leagueDivisons);
	}

	$scope.header = "LoL Esports";
	$scope.changeHeader = function(name){
		$scope.header = name;
	}


	$scope.nextId = function(id){
		console.log(id);
		$location.path("#/" + id);
	}                                    
	// user=true&

	var url = 'http://www.digitalcrafts.com/students/twitter/hashtag.php?user=true&hash=lolesports&secondHash=' + leagueDivisons;

	$http.get(url).success(function(data){

		$scope.data = data.statuses;
		for(i = 0; i<$scope.data.length; i++){
			if($scope.data[i].user.profile_banner_url === undefined){
				$scope.data[i].user.profile_banner_url = 'img/placeholder.jpg';
			} 
			// console.log($scope.data[i].user.profile_banner_url);
			var time = $scope.data[i].created_at;
			var tweetTime = new Date(time);
			$scope.data[i].tweetSeconds = tweetTime.getTime()/1000;
		}
			// function checkImageExists(urlToImage){
			// 	$http({method: 'GET', url: urlToImage}).then(function successCallback(response) {
			// 	    return urlToImage;
			// 	}, function errorCallback(response) {
			// 	    if(response.status == 404){
			// 	    	//image does not exist. Use Placeholder.
			// 	    	return 'img/placeholder2.jpg';
			// 	    }
			// 	});	
			// }
// ​			var bannerImage = checkImageExists($scope.data[i].user.profile_banner_url);





		console.log(data);
		// console.log(tweetTime);
		// console.log($scope.data[i].tweetSeconds);


		$interval(function(){
			for(i=0; i<$scope.data.length; i++){
				var currentDate = new Date();
				var currentTimeInSeconds = currentDate.getTime()/1000;
				currentTime = currentTimeInSeconds;
				tweetTime = $scope.data[i].tweetSeconds;
				var timeDiff = currentTime - tweetTime;
					// console.log(currentTimeInSeconds);
				if(timeDiff > 86400){
					currentTime = currentTimeInSeconds / 86400;
					tweetTime = $scope.data[i].tweetSeconds / 86400;
					timeStamp = " days ";
				} else if(timeDiff > 3600){
					currentTime = currentTimeInSeconds / 3600;
					tweetTime = $scope.data[i].tweetSeconds / 3600;
					timeStamp = " hours ";
				} else if(timeDiff > 60){
					currentTime = currentTimeInSeconds / 60;
					tweetTime = $scope.data[i].tweetSeconds / 60;
					timeStamp = " mintues ";
				} else {
					timeStamp = " seconds ";
				}
				$scope.data[i].sinceTweeted = Math.floor(currentTime - tweetTime) + timeStamp + "ago";
			};

		}, 1000);
		


	});

});






