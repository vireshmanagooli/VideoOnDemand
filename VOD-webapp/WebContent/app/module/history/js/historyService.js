mainApp.factory('historyService', [ '$http', '$q', function($http, $q) {
	var historyService = {};
	
	//Get the Related History
	historyService.getHistory = function(clientId) {
				
		var deferred = $q.defer();
		$http({
			url : 'http://localhost:1337/history/getHistory?'+"clientId="+clientId,
			method : 'GET'
		}).then(function(response) {
			console.log(response.data.results);
			deferred.resolve(response.data.results);
		});
		return deferred.promise;		
	};

	return historyService;
} ]);