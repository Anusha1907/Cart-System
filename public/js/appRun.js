angular.module('appRun',[]).run(function($rootScope,$state,$http,items){
	// console.log('hello')
	$rootScope.$on('$stateChangeStart', function(event,toState,toParams,fromState,fromParams){
		$rootScope.$state=$state;

		// $http({
		// 	url:"/getsession",
		// 	method:"GET"
		// }).then(function(response){
		// 	response=response.data;
		// 	event.preventDefault();
		// 	if(response.success){
		// 		console.log(response);
		// 		var auth=['home','home2','add','mycart','profile'];
		// 		// console.log(toState);
		// 		 $rootScope.currentUser = response.result[0];
		// 		 console.log($rootScope.currentUser);
		// 		var num=auth.indexOf(toState.name);
		// 		if(num!=-1){
		// 			$state.go(toState);
		// 		   }
		// 		else{
		// 			$state.go("home");
		// 			}
		// 	}else{
		// 		console.log(response);
		// 		var auth=['login','register'];
		// 		// console.log(toState.name);
		// 		$rootScope.currentUser = null;
		// 		var num=auth.indexOf(toState.name);
		// 		if(num!=-1)
		// 			$state.go(toState);
		// 		else
		// 			$state.go("login");

		// 	}
		// })

		items.getSession.get({},function(response){
			event.preventDefault();
			console.log(response)
			if(response.success){
				$rootScope.currentUser=response.result;console.log(response);
				var auth=['home','home2','add','mycart','profile'];
				// console.log(toState);
				 $rootScope.currentUser = response.result;
				 console.log($rootScope.currentUser);
				var num=auth.indexOf(toState.name);
				if(num!=-1){
					$state.go(toState);
				   }
				else{
					$state.go("home");
					}
				// if(response.result.email=="kodavatianusha.19@gmail.com"){
				// 	$state.go("home2");
				// }
				// else{
				// 	console.log(response.result._id);
				// 	$state.go("home")
				// }
			}else{
				// $rootScope.currentUser=null;
				// $state.go("login");
				console.log(response);
				var auth=['login','register'];
				// console.log(toState.name);
				$rootScope.currentUser = null;
				var num=auth.indexOf(toState.name);
				if(num!=-1)
					$state.go(toState);
				else
					$state.go("login");
			}
		})
		$rootScope.logout=function(){
		$http({
			url:"/logout",
			method:"GET"

		}).then(function(response){
			if(response.data.success){
				console.log("loggedout");
				$state.go("login");
			}else{
				console.log("errorr");
			}
		})
	}
	$rootScope.addtocart=function(i,b, callback){
	      $http({
	      	url:"/addtocart",
	      	method:"POST",
	      	data:{itemid:i,quantity:b,userid:$rootScope.currentUser._id}
	      }).then(function(response){
	      	console.log(response);
	      	console.log(response.data);
	      	if(callback){
				callback(response);
	      	}
	      	if(response.data.success){
	      		console.log(response);
	      		$rootScope.updatetotalcost();
	      	}else{
	      		console.log(response);
	      	}
	      })
	  }
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


		
})	
})