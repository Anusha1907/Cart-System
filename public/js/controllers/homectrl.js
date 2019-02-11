var homectrl=angular.module("homeCtrl",[]);
homectrl.controller('homeController', function($scope,$http,$state,$rootScope,$stateParams,items){
	$scope.items=[];
	$scope.quantity=[];
  console.log($rootScope.currentUser);

	
	
	// $scope.totalquantity=0;
	$scope.getitems=function(){
		// $http({
		// 	url:"/home",
		// 	method:"POST"
		// }).then(function(response){
		// 	console.log(response.data)
		// 	if(response.data.success){
  //              $scope.items=response.data.result;
  //              $scope.items = $scope.items.filter(function(obj){
  //              		obj.numbers = Array.from({length:obj.number}, (v, k) => k+1)
	 //               return obj;
  //              })
		// 	}
		// })
  items.getItems.save({},function(response){
    if(response.success){
      console.log(response)
      $scope.items=response.result;
        $scope.items = $scope.items.filter(function(obj){
                   obj.numbers = Array.from({length:obj.number}, (v, k) => k+1)
                 return obj;
               })
    }else{
      console.log(response);
    }
  })

	}
	$scope.getitems();

  $rootScope.updatetotalcost=function(){
  		$http({
  			url:"/gettotalcost",
  			method:"POST",
  			data:{userid:$rootScope.currentUser._id}
  		}).then(function(response){
  			if(response.data.success){
  				$rootScope.totalcost=response.data.result[0].totalcost;
  			}else{
  				console.log(response);
  			}
  		})
  }
  $scope.profile=function(){
    $state.go(profile);
  }
 
  })
