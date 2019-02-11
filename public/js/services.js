angular.module("getService",[]).factory('items', function($resource){
	return {
		getItems:$resource("/home",{},{save:{method:"POST"}}),
		getSession:$resource("/getsession",{},{get:{method:"GET"}})
	};
})