angular.module('reports').factory('Report3', ['$resource',
	function($resource){

		return $resource('/api/report_3/:report3Id', {
		    projectId : '@_id'
		  }, {
		    update : {
		      method: 'PUT'
		    }
		  });

}]);

angular.module('reports').factory('Report4', ['$resource',
	function($resource){

		return $resource('/api/report_4/:report4Id', {
		    projectId : '@_id'
		  }, {
		    update : {
		      method: 'PUT'
		    }
		  });

}]);


angular.module('reports').factory('Report5', ['$resource',
	function($resource){

		return $resource('/api/report_5/:report5Id', {
		    projectId : '@_id'
		  }, {
		    update : {
		      method: 'PUT'
		    }
		  });

}]);