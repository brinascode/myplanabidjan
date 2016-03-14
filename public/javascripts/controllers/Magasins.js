app.controller("Magasins",["$scope","$http","$location","$window",
	function($scope,$http,$location,$window){


$scope.searchInfo={}
$scope.results = []
$scope.typedSearch  //For the typed searches
$scope.message = "Si vous n'entrez pas de criteres, nous allons vous proposer tout les magasins et salons de beautés de notre...";

//For our ng-hides :)
$scope.clickedSection = true;
$scope.searchHidden= false;
$scope.hi = $location.absUrl()

//To hide the other search parts that dont correspond
$scope.vetExtraH = true;
$scope.magasinH=true;
$scope.beauteH=true;
$scope.beauteHide = function(){
	$scope.beauteH = false;
   $scope.magasinH = true;
}
$scope.magasinHide = function(){
	$scope.magasinH = false;
	$scope.beauteH = true;
}
//This function is used by the vetements/chaussures/... to give extra details
//What about when you declick??
$scope.extraOptionsHide = function(){
$scope.vetExtraH = false;
}





//This is our service to hit the Node Api which finds the restaurant that matches our criteria
$scope.search = function(searchInfo){
	console.log($scope.hellos)
   
    $http.post("/findmagasin",searchInfo).success(function(data){
	if(data.length ===0){
		$scope.message="Pas de résultats pour ces criteres. Réessayez ou vérifiez que vous avez bien écrit le nom du magasin"}
	 else{
			$scope.message= ""
		}
	$scope.results = data
    console.log(data[0])
//We must make the searchInfo empty again and ready for new searches
	$scope.searchInfo = {}
}).error(function(data){console.log(data)})}


$scope.clickedMag = function(index){
$window.location.href = "/plan/"+$scope.results[index]._id
}



}])