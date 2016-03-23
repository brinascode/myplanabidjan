app.controller("Restaurants",["$scope","$http","$location","$window",
	function($scope,$http,$location,$window){

$scope.searchInfo={}
$scope.restaurants = []
$scope.typedSearch  //For the typed searches
$scope.message = "Si vous n'entrez pas de criteres, nous allons vous proposer tout les restaurants de notre...";

//For our ng-hides :)
$scope.african=true;
$scope.clickedSection = true;
$scope.searchHidden= false;
$scope.hi = $location.absUrl()

//This is our service to hit the Node Api which finds the restaurant that matches our criteria
$scope.search = function(searchInfo){

    $http.post("/findRestaurant",searchInfo).success(function(data){
	if(data){$scope.message = "Miam, bon appetit!" }else
		{$scope.message = "Pas de résultats pour ces critères"}

	$scope.restaurants = data  

	console.log(data)
 
//We must make the searchInfo empty again and ready for new searches
	$scope.searchInfo = {}
}).error(function(data){console.log(data)})}


$scope.clickedRestau = function(index){
$window.location.href = "/plan/"+$scope.restaurants[index]._id
}



}])