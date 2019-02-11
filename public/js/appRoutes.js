var routes=angular.module("appRoutes",[]);
routes.config(function($stateProvider,$urlRouterProvider,$locationProvider){
	$urlRouterProvider.when('/','/login');
	$stateProvider
	.state("login",{
		url:"/login",
		templateUrl:"views/login.html",
		controller:"loginController",
		authenticate:"false"
	})
	.state("register",{
		url:"/register",
		templateUrl:"views/register.html",
		controller:"registerController",
		authenticate:"false"
	})
	.state("home",{
		url:"/home",
		templateUrl:"views/home.html",
		controller:"homeController",
		authenticate:'true'
	})
	.state("home2",{
		url:"/admin",
		templateUrl:"views/home2.html"
	})
	.state("add",{
		url:"/add",
		templateUrl:"views/add.html",
		controller:"addController"

	})
	.state("mycart",{
		url:"/mycart",
		templateUrl:"views/showcart.html",
		controller:"showcartController"
	})
	.state("profile",{
		url:"/profile",
		templateUrl:"views/profile.html",
		controller:"profileController"
	})
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
	
})