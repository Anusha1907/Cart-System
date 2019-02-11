var profilectrl=angular.module("profileCtrl",[]);
profilectrl.controller('profileController', function($state,$scope,$rootScope,$http){
	$scope.data={};
	$scope.getprofile=function(){
		$http({
			url:"/profile",
			method:"POST",
			data:{userid:$rootScope.currentUser._id}
		}).then(function(response){
			console.log(response)
			if(response.data.success){
				$scope.data=response.data.result;
				$scope.q=$scope.data.country
			}else{
				console.log(response.data);
			}
		})
	}
	$scope.getprofile();
     $scope.getcountry=function(){
     	$http({
     		url:"countries.json",
     		method:"GET",
     	}).then(function(response){
     		// console.log(response)
     	     $scope.countries=response.data;
     	     // console.log($scope.countries);
     	     // console.log($scope.data.country)
     	     // console.log($scope.countries[$scope.q]);
     	     $scope.country=$scope.countries[$scope.q]
     	})
     }
	$scope.getcountry();
	$scope.save=function(){
		$http({
			url:"/save",
			method:"POST",
			data:{userid:$rootScope.currentUser._id,address:$scope.data.address}
		}).then(function(response){
			if(response.data.success){
				console.log(response.data.result)
				alert("changes saved");
			}else{
				console.log(response);
			}
		})
	}
})