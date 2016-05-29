app.factory("authentication",function($http){


return $http.get("/profileinfo").success(function(data){
	return data
})
	


})