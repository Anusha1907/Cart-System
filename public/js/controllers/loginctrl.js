var loginctrl=angular.module("loginCtrl",[]);
loginctrl.controller('loginController', function($scope,$state,$rootScope,$http, FileUploader){
	$scope.data={};
	
	$scope.login=function(){
		$http({
			url:"/login",
			method:"POST",
			data:$scope.data
		}).then(function(response){
			console.log(response.data)
			if(response.data.success){
				if(response.data.result[0].email=="kodavatianusha.19@gmail.com"){
				$state.go("home2");
			}else{
				console.log(response.data.result[0]._id);
				$state.go("home")
			}
			}else{
				alert(response.data.errors);
			}
		})
	}


	
});