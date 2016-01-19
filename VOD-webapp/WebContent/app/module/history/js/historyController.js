mainApp.controller('historyController', ['$scope', '$http', 'historyService',
  function ($scope, $http, historyService) {
	
	$scope.history = {};	
	var clientId = localStorage.clientId;
	console.log("ClientId : " + clientId);
	//Get the product detail			
	historyService.getHistory(clientId).then(function(detail) {
		$scope.history.movies = detail;				
	}, function(detail) {
		$scope.history.movies = detail;	
	});
	
	$scope.history.showGap = function(index){
		return ((index+1) % 4 == 0) ? true : false; 
	};
	
}]);