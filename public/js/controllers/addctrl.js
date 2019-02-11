var addctrl=angular.module("addCtrl",[]);
addctrl.controller('addController', function($state,$http,$scope,FileUploader){
	$scope.data={}; 
	console.log(FileUploader);
	var uploader= $scope.uploader= new FileUploader({
		url:"/upload",
	})	
	uploader.autoUpload=true;
	uploader.onSuccessItem=function(a,b,c,d){
       // console.log(a);
       console.log(b);
       // console.log(c);
       // console.log(d);
       $scope.data.imagepath=b.path;
       console.log($scope.data.imagepath)

	}

	$scope.add=function(){
		$http({
			url:"/add",
			method:"POST",
			data:$scope.data
		}).then(function(response){
			if(response.data.success){
				$state.go("home2");
			}else{
				console.log(response.data);
			}
		})
    }
 
	
})
	// data:{file:$scope.file}
	// console.log(uploader1);
	// uploader1.onSuccessItem=function(a, b, c, d){
	// 	console.log(a);
	// 	console.log(b);
	// 	console.log(c);
	// 	console.log(d);
	// // $scope.imagepath=response.filepath
	// }

	// $scope.uploadImage =function(){
	// 	console.log('upload fun');
	// 	uploader.uploadAll();
	// }