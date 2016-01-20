mainApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {		
	
    $routeProvider.
      when('/history', {
        templateUrl: 'app/module/history/html/history.html',
        controller: 'historyController'
      });
}]);