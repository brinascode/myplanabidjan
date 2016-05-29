app.controller("MainController",["$scope","$http","$location","$window","authentication",
	function($scope,$http,$location,$window,authentication){

//****************************************************************For login and signup of home page

$scope.login = function(){$window.location.href = "/login"}  
$scope.signup = function(){$window.location.href = "/signup"} 
$scope.facebooklogin = function(){$window.location.href = "/auth/facebook"}

//****************************************************************For plan view
$scope.id = window.location.pathname.split("/")

//Find a way to restrict avis posting to loggedin users only!
//Pour les avis
$scope.avis={}
$scope.avis.posted = new Date()
$scope.avisTaken = []
$scope.user={}

//This happens the minute the page is loaded :) 
//We go fetch all the data of the opened place, by using its id from the url
$http.post("/clickedPlan",{_id:$scope.id[2]}).success(function(data){
$scope.plan= data
$scope.open = $scope.plan[0]
$scope.avis.discussionId = $scope.id[2]
}).error(function(data){})


//********************************************************Avis

//****************************** To get opened user data 


$http.get("/profileinfo").success(function(data){
$scope.user = data
$scope.avis.author = $scope.user.local.email
}).error(function(){})


//Loading tout les avis
$http.post("/takeAvis",{discussionId:$scope.id[2]}).success(function(data){
	$scope.avisTaken = data
	$scope.avisTaken.reverse() //So that its the opposite of chrono.. order. Most recent shown first
	console.log(data)
}).error(function(data){console.log(data)})


//Pour soummetre un avis
$scope.submitAvis=function(avis){ //Make sure right stuff is sent , make if for that later
$http.post("/submitAvis",avis).success(function(data){
	$scope.avisTaken = data
	$scope.avisTaken.reverse()
	console.log(data)
}).error(function(data){
	console.log(data)
})
$scope.avis={}
}






}])