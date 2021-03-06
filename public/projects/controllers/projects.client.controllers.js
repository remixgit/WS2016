angular.module('projects').controller('listOfProjectsCtrl', ['$scope', '$rootScope', '$location','Projects','Users','$stateParams','$state','$timeout','Authentication',
    function($scope,$rootScope,$location,Projects,Users,$stateParams,$state,$timeout,Authentication) {
		
     	$scope.authentication = Authentication;
		  
		$scope.dialogShown = false;
		$scope.show = function(){
			$scope.dialogShown = true;
		}
		$scope.data = {
			singleSelect: null,
			multipleSelect: [],
			option1: 'option-1',
		};
		$scope.listProjects={};
		$scope.addProject = function(){
			$state.go('dashBoard.addProject');	
		};
		var loadEntries = function () {
			$scope.listProjects = Projects.query(function(){
				$scope.listProject = new Projects();
						console.log("NIJE USAO");

						$scope.ubaci= function(member,project){
							console.log("USAO");
							var oznaka=false;

							var korisnici = Projects.get({projectId:project},function(response) {
								$scope.teamMembers = korisnici.teamMembers;


							$scope.listProject.teamMembers=[];


							for(var i=0;i<$scope.teamMembers.length;i++){
								$scope.listProject.teamMembers.push($scope.teamMembers[i]);
								if($scope.teamMembers[i]._id==member){
									oznaka=true;
								}
								
							}
						
							if (oznaka==false) {
								$scope.listProject.teamMembers.push(member);

							}
										
							
							});
							
				
						}
						
						var listClone = [];
						
						
						if(!Authentication.isAdmin){
								for(var i = 0; i <$scope.listProjects.length; i++){
									for(var j = 0; j < $scope.listProjects[i].teamMembers.length; j++){
										if(Authentication.user._id ==  $scope.listProjects[i].teamMembers[j]._id){
											listClone.push($scope.listProjects[i]);
											break;
										}
									}	
								}
						}	
						if(listClone.length > 0){
							$scope.listProjects = [];
							$scope.listProjects	= listClone;		
						}
			});		
		}
		loadEntries();
		

		$scope.addProject = function(){
			$timeout(function(){
				$location.path('/projects/addProject');
			});
		}
		var vm = this;
		vm.project = {};
		$scope.create = function(){
			var project = new Projects({
				title: this.projectTitle,
				teamMembers: $scope.data.multipleSelect
			})
			var tmp = [];
			for(var i = 0; i < project.teamMembers.length; i++){
				if(project.teamMembers[i] != Authentication.user._id)
					tmp.push({_id:project.teamMembers[i]});
			}
			project.teamMembers = tmp;
			project.$save(function(response){
					console.log(response);
					if(response.forbidden != 'true')
						$state.go('dashBoard.loadProjects');
					else
						$scope.error = "Title already exists";
			}, function(errorResponse){
				$scope.error = errorResponse.data.message;
			});
		};
		$scope.findOne = function(){
			console.log('projectId: ' + $stateParams.projectId);
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			}, function(){console.log('project: ' + $scope.project._id)});
		};
		$scope.update = function(){
			var tmp = [];
			for(var i = 0; i < $scope.data.multipleSelect.length; i++){
				if($scope.data.multipleSelect[i] != Authentication.user._id)
					tmp.push({_id:$scope.data.multipleSelect[i]});
			}
			$scope.project.teamMembers = [];
			$scope.project.teamMembers = tmp;
			console.log(JSON.stringify($scope.project.teamMembers));
			$scope.project.$update(function(){
				$state.go('dashBoard.loadProjects');
			}, function(errorResponse){
				$scope.error = JSON.stringify(errorResponse.data);
			});
		};
		$scope.save = function () {

			console.log('jeeeeeeeeej');
			$scope.listProject = new Projects({
				
			});
			$scope.listProject.teamMembers = $scope.data.multipleSelect;
			$scop
			if(!$scope.listProject._id){
				console.log('1');
				$scope.listProject.$save(loadEntries);
				$state.go('dashBoard.projects');
			}
			else{
				console.log('2');
				$scope.listProject.$update(loadEntries);
				$state.go('dashBoard.projects');		
					console.log('3');		
			}
		

			
		} 
		$scope.delete = function (listProject) {
			listProject.$delete(loadEntries);
	//		listProject1.$delete(loadEntries);
		}

		

		$scope.addMember = function(id){

			$state.go('dashBoard.addMember',{projectId:id});
		}

		$scope.deleteMember = function(index){
		
				$scope.listProject.teamMembers.splice(index, 1);
				$scope.listProject.$update(loadEntries);

				$state.go('dashBoard.teamMembers', {}, {reload: true});
				
		
		}

		$scope.edit = function (listProject) {
			$scope.listProject = listProject;
	//		$scope.listProject1 = listProject;
			$state.go('dashBoard.editProject');
		} 

		


		var loadEntriesUsers = function () {
			
			$scope.user = new Users();
			var users = Users.query(

				function(response) {
					console.log('duzina users je: '+users.length)
					if(users.length>0){
					$scope.user._id = users[0]._id;
					
				}
    			
    		}
    		);
    		$scope.users=users;
		
   
		}
		loadEntriesUsers();

		

		$scope.Users = function(){
			console.log('usao14');
			console.log($scope.user);
	
			var korisnici = Users.get({userId:$scope.user._id},function(response) {
			$scope.teamMembers = korisnici.teamMembers;
	
			});
		}

		$scope.Projects = function(){
			console.log('usao14');
			console.log($scope.user);
	
			var korisnici = Projects.get({projectId:$scope.project._id},function(response) {
			$scope.teamMembers = korisnici.teamMembers;
	
			});
		}

		$scope.showAddProjectForm = function()
		{
			$state.go('dashBoard.addProject');

		}


		var loadForEdit = function () {
			
			$scope.data.multipleSelect = [];
			
			$scope.project = new Projects();
			
    		
    		var listProject = Projects.get({projectId:$stateParams.projectId},function(response){


			$scope.listProject = new Projects();
			$scope.listProject._id = listProject._id;
			$scope.listProject.teamMembers={};
			

			$scope.listProject.title=listProject.title;
			$scope.listProject.teamMembers=listProject.teamMembers;


			$scope.projectTitle = listProject.title;
			});

			

			var users = Users.query(

						function(response) {
							console.log('duzina users je: '+users.length)
							if(users.length>0){
							$scope.user._id = users[0]._id;

						}
		    			
		    		}
		    		);
		    		$scope.users14=users;
		    		console.log('aaaa'+$scope.users14.length);



				//    var korisnici = Projects.get({projectId:project},function(response) {
				var korisnici = Projects.get({projectId:$stateParams.projectId},function(response) {
							$scope.teamMembers = korisnici.teamMembers;

							$scope.listProject1 = new Projects();
					$scope.listProject1._id = listProject._id;
					$scope.listProject1.teamMembers={};
			
					$scope.listProject1.title=listProject.title;




					for(var i=0;i<$scope.users14.length;i++){
							for(var j=0;j<$scope.teamMembers.length;j++){
							var name=$scope.users14[i]._id;
							var name1=$scope.teamMembers[j]._id;
							$scope.data.multipleSelect.push($scope.teamMembers[j]._id);
								if(name1==name){
								
								console.log(name);
								$scope.users14.splice(i,1);
								console.log($scope.users14.length);
								}
							}
						} 

						$scope.listProject1.teamMembers=[];
			

						for(var i=0;i<$scope.users14.length;i++){
							$scope.listProject1.teamMembers.push($scope.users14[i]);

						}
							

				});
			
			console.log($scope.data.multipleSelect);
    		
    		
		}

		if($stateParams.projectId===undefined){
			loadEntries();
		}
		else{
			loadForEdit();

		}

		$scope.editProject = function(id){
			$state.go('dashBoard.editProject',{projectId:id});
		}

		

		$scope.showUsers = function(id)
		{
			$state.go('dashBoard.teamMembers',{projectId:id});

		}

		$scope.listTasks = function(id)
		{
			$state.go('dashBoard.tasksForProject',{projectId:id});
		}

		$scope.reports = function(id)
		{
			$state.go('dashBoard.chooseReport',{projectId:id});
		}
		
        
}]);

 