mainApp.controller('historyController', ['$scope', '$http', 'historyService',
  function ($scope, $http, indexService) {
	
	$scope.history = {};	
	
	//Get the product detail			
	historyService.getHistory(clientId).then(function(detail) {
		$scope.history.movies = detail;				
	}, function(detail) {
		$scope.history.movies = detail;	
	});
	
}]);