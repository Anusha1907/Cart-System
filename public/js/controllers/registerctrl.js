var registerctrl=angular.module("registerCtrl",[]);
registerctrl.controller('registerController', function($state,$http,$scope){
	$scope.data={};
	$scope.getcountries=function(){
		$http({
			url:"countries.json",
			method:"GET"

		}).then(function(response){
			console.log(response);
			$scope.countries=response.data;
		})
	}
	$scope.getcountries();
	$scope.getcodes=function(){
		$http({
			url:"phonecodes.json",
			method:"GET"

		}).then(function(response){
			console.log(response);
			$scope.codes=response.data;
		})
	}
	$scope.getcodes();

	$scope.getPhoneCode = function(){
		// console.log('hi');
		$scope.code = $scope.codes[$scope.data.country]
	}
	$scope.show=function(){
	$http({
		url:'/register',
		method:"POST",
		data:$scope.data
	}).then(function(response){
		if(response.data.success){
			$scope.data={};
		}else{
			console.log(response.data);
			alert(response.data.errors);
		}
	})}

});