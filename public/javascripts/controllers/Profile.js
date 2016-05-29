app.controller("Profile",["$scope","$http",function($scope,$http){

$scope.user={}

$http.get("/profileinfo").success(function(data){
$scope.user = data
}).error(function(){})



}])

