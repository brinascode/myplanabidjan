var app = angular.module("MyPlanAbidjan",["ngRoute"]);

app.config(function($routeProvider,$locationProvider){
//For the index boxes only here:
$routeProvider
.when("/restaurants",{
controller:"Restaurants",
templateUrl:"views/restaurants.html"
})
.when("/magasinsetsoins",{
controller:"Magasins",
templateUrl:"views/magasinsetsoins.html"
})
.when("/fun",{
controller:"Funs",
templateUrl:"views/fun.html"
})
.otherwise({redirectTo: "/"});

$locationProvider.html5Mode(true)


})