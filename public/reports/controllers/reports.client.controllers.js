angular.module('reports').controller('listProjectsCtrl', ['$scope', '$rootScope', '$location','Projects','$http','Tasks','$stateParams','$state','Authentication','Users',
    function($scope,$rootScope,$location,Projects,$http,Tasks,$stateParams,$state,Authentication,Users) {

    	var isAdmin = Authentication.user.role=='admin';
    	var userLogId = Authentication.user._id;
    	if(isAdmin){
			$scope.projects = Projects.query();
		}
			else
			{
				if(userLogId)
				Users.get({userId:userLogId}, function(response){
					$scope.projects = response.projects;
				})
			}	
			$scope.project = new Projects();


    	$scope.projectReport = function(id){
    		$state.go('dashBoard.chooseReport',{projectId:id});
    	}

    	$scope.goReport1 = function(){
    		$state.go('dashBoard.report1',{projectId:$stateParams.projectId})
    	}

		$scope.goReport2 = function(){
    		$state.go('dashBoard.report2',{projectId:$stateParams.projectId})
    	}

		$scope.goReport3 = function(){
    		$state.go('dashBoard.report3',{projectId:$stateParams.projectId})
    	}

		$scope.goReport4 = function(){
    		$state.go('dashBoard.report4',{projectId:$stateParams.projectId})
    	}

    	$scope.goReport5 = function(){
    		$state.go('dashBoard.report5',{projectId:$stateParams.projectId})
    	}


}]);

angular.module('reports').controller('reportCtrl', ['$scope', '$rootScope', '$location','Projects','$http','Tasks','$stateParams','$state','Report3','Authentication','Report4','Report5',
    function($scope,$rootScope,$location,Projects,$http,Tasks,$stateParams,$state,Report3,Authentication,Report4,Report5) {
    		

    		if($state.current.name.includes("report3"))
    		{
    			$scope.days=[];
				$scope.project = Projects.get({projectId:$stateParams.projectId});
				$scope.user = Authentication.user;
	    		var res=Report3.get({report3Id:$stateParams.projectId}, function(response){
    				loadReport(res);
    			});
    		}

    		if($state.current.name.includes("report4"))
    		{
				$scope.days=[];
				$scope.project = Projects.get({projectId:$stateParams.projectId});
				$scope.user = Authentication.user;
	    		var res=Report4.get({report4Id:$stateParams.projectId}, function(response){
    				loadReport(res);
    			})
    		}

    		if($state.current.name.includes("report5"))
    		{
    			$scope.project = Projects.get({projectId:$stateParams.projectId},function(response){
    				$scope.users = response.teamMembers;
    			})
				$scope.days=[];
				$scope.user = Authentication.user;
	    		var res=Report5.query({report5Id:$stateParams.projectId}, function(response){
	    			res=response[0].data;
	    			$scope.selected =  response[0].username;
    				loadReport(res);
    			})
    		}


    		$scope.showGraph = function(username){
    			$scope.days=[];
    			var res=Report5.query({report5Id:$stateParams.projectId}, function(response){
    				if(username)
    				for(var i=0; i<response.length; i++){
    					if(response[i].username===username)
    					{
    						res=response[i].data;
    						$scope.selected =  username;
    						loadReport(res);
    					}
    				}
    				else{
    					res=response[response.length-1].data;
    					$scope.selected =  "Not assigned";
    					loadReport(res);
    				}
    				
    			})
    		}
			
			function loadReport(res){
    			var max=0;
				for (var key in res) {
					
					//looping through js object, not very good
					  if (res.hasOwnProperty(key) && key.charAt(0)!='$'){
					  	if(res[key]>max)
					  		max=res[key];
					  	day = {
						x: key,
						percentage: res[key]
					}
					$scope.days.push(day);
					}
				}

				if($scope.days.length==0)
					return;

				for(var i=0; i<$scope.days.length; i++ )
				{
					$scope.days[i].title = $scope.days[i].percentage;
					$scope.days[i].percentage = $scope.days[i].percentage/max*100;
				}

				for(var j=$scope.days.length-1; j>=0; j--){
					var max=0;
					var ind=-1;
					for(var i=0; i<j+1; i++)
					{
						var split = $scope.days[i].x.split("/");
						var value = parseInt(split[0])*1000+parseInt(split[1])*50+parseInt(split[2]);
						
						if(value>max){
							max=value;
							ind=i;		
						}
					}
					var temp = $scope.days[j];
					$scope.days[j]=$scope.days[ind]
					$scope.days[ind]=temp;
				
				}
					

				var min=$scope.days[0];
				var max=$scope.days[$scope.days.length-1];
				var date = min.x;
				var split = date.split("/");
				date = new Date(split[0],split[1]-1,split[2]);
				var control = 0;
				var i=1;
				var dateForViewing = min.x;
				while(dateForViewing!=max.x){
					//infinite loop protection
					control++;
					if(control>3000)
						break;

					
					date.setTime( date.getTime() + 1 * 86400000 )
					dateForViewing=date.getFullYear().toString()+"/"+(date.getMonth() + 1).toString() + "/" + date.getDate().toString();
					var element = {
						x: dateForViewing,
						percentage:0,
						title:0 

					}
					if(dateForViewing!=$scope.days[i].x)
					$scope.days.push(element);
					else i++;


			}
			for(var j=$scope.days.length-1; j>=0; j--){
					var max=0;
					var ind=-1;
					for(var i=0; i<j+1; i++)
					{
						var split = $scope.days[i].x.split("/");
						var value = parseInt(split[0])*1000+parseInt(split[1])*50+parseInt(split[2]);
						
						if(value>max){
							max=value;
							ind=i;		
						}
					}
					var temp = $scope.days[j];
					$scope.days[j]=$scope.days[ind]
					$scope.days[ind]=temp;
				
				}
				
    		}

}]);

loadedChart = false;
angular.module('reports').controller('reportCntrl', ['$scope', '$rootScope', '$location','Projects','$http','Tasks','$stateParams','$state','Report1','Authentication','Report2',
    function($scope,$rootScope,$location,Projects,$http,Tasks,$stateParams,$state,Report1,Authentication,Report2) {

    		if($state.current.name.includes("report1"))
    		{
    			Report1.query({report1Id:$stateParams.projectId}, function(response) {
    				draw(response,"Not assigned");
    			});

    		}

    		if($state.current.name.includes("report2"))
    		{
    			Report2.query({report2Id:$stateParams.projectId}, function(response) {
    				draw(response,"Unifinished");
    			});
    		}

    		function draw(response,value) {
				if(loadedChart === false) {
			    	google.charts.load('current', {'packages':['corechart']});
			    	loadedChart = true;
				}
			    google.charts.setOnLoadCallback(drawChart);
			    function drawChart() {
					var report = [];
					report.push(['', '']);
			    	for(var i = 0; i < response.length; i++) {
			    		if(response[i].username !== "" && response[i].username !== "#") {
			    			var name = response[i].firstName + " " + response[i].lastName + " (" +  response[i].username + ") ";
			    		}  else if(response[i].username === "#") {
			    			var name = "Unknown";
			    		} else {
			    			var name = value;
			    		}
			    		var element = [name, response[i].percantage];
			    		report.push(element);
			    	}
					
			        var data = google.visualization.arrayToDataTable(report);
					
					var reportTitle = "";
					if(value == "Not assigned") {
						reportTitle = "Tasks assigned to users";
					} else if(value == "Unifinished") {
						reportTitle = "Finished tasks";
					}
					
			        var options = {
			          title: reportTitle
			        };

			        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

			        chart.draw(data, options);
			    }
			}


}]);

/*
angular.module('reports').controller('repCon', ['$scope', '$rootScope', '$location','Projects','$http','Tasks','$stateParams','$state','Authentication','Report5',
    function($scope,$rootScope,$location,Projects,$http,Tasks,$stateParams,$state,Authentication,Report5) {
    		
    		if($state.current.name.includes("report5"))
    		{
    			$scope.numbers=[];
				$scope.project = Projects.get({projectId:$stateParams.projectId});
				$scope.user = Authentication.user;
	    		var res=Report5.query({report5Id:$stateParams.projectId}, function(response){
    				loadReport();
    			})
    		}
			
			function loadReport(){
    			var max=0;

				for (var i=0; i<res.length; i++)
				{

				     var firstName=res[i].firstName;
				     var date = res[i].date;
				     var number = res[i].number;

				     if(number>max)
					  		max=number;

				     num = {
						x: firstName+' '+date,
						title: number,
						percentage: number
					}
					$scope.numbers.push(num);


				}

				for(var i=0; i<$scope.numbers.length; i++ )
				{
				
					$scope.numbers[i].percentage = $scope.numbers[i].percentage/max*100;
				}
				
    		}

}]);
*/