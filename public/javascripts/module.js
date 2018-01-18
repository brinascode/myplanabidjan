//We make an app and store it in the var app
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




app.directive("formValid",function(){
	return {
		restrict:"EA",
		replace:false,
		transclude:false,
		scope:{fieldLength:"=fieldLength",checkProperties:"=checkProperties"},
		controller:function($scope){
			var presences =0
			var checks = []
				

			this.addCheck = function(check){
				checks.push(check)
			}
			this.addPresence=function(){
				presences +=1
			}
			this.removePresence= function(){
				presences -=1
			}

			$scope.checks = checks //We pass it to scope later rather than at once so that 
									//dependent directives can use the functions. they cant access scope so..
			$scope.presences = presences
		},
		link:function(scope,element,attrs){

			scope.checkPresence = function(){
				if(scope.presences != scope.fieldLength){
					return false
				}
				else{
					return true
				}
			}

			scope.submit = function(){
				console.log(scope.checkPresence())
			}
		}
	}


})

app.directive("fieldCheck",function(){
	return {
		restrict:"A",
		replace:true,
		require:"^?formValid",
		transclude:true,
		scope:{check:"=fieldCheck"}, //is this necessary?
		link:function(scope,element,attrs,formValidController){
		
			formValidController.addCheck(scope.check)

		}
	}
})

app.directive("presenceCheck",function(){
	return {
		restrict:"A",
		replace:true,
		require:"^?formValid",
		scope:{item:"=presenceCheck"},
		link:function(scope,element,attrs,formValidController){
			scope.good = false
			//Does this ever iterate, or its run once??
			if(scope.item){
				console.log(scope.item +"Item is good now")
				scope.good = true
				formValidController.addPresence()
				console.log(formValidController.presences)
			} //How to check if it ever turns false
			else{
				scope.good=false
				formValidController.removePresence()
				console.log(formValidController.presences)
			}



		}
	}
})


//In controller its $scope, in link function its scope. Are they the same though? Yes they are
//If your directive is EA, then you can only use your self made attributes in the 
//head of the element and not inside. If you want to use it inside, make an A directive
//The transcluded stuff will take its data from parent scope not directive scope

//Angular is smart enough to convert numbers to number 
//the i alone will give the property name

//The scope.data[i] will give us the inside of the i, cause the i takes the place of the
//property name :))


//Forced to bind twice



















app.directive("expander",function(){

	return {

		restrict:"EA",
		replace:true,
		transclude:true,
		scope:{title:"=expanderTitle"},//Adding properties to our scope from mother scope
		template:"<div> " +
		"<div ng-click='toggle()'> {{title}} </div>"+
		"<div ng-transclude ng-show='hideShow'></div>"+
		  "</div>",
		link:function(scope,element,attrs){
			scope.hideShow = false
			scope.toggle = function(){
				scope.hideShow = !scope.hideShow
			}
		}

	}
})


/* 2nd part!! :))
-Dabords, nous devons avoir plusieurs expanders qui sortent
-The alot of stuff goes under each expander











****************************First part
As long as there's a template, gonna take the templateover whats in html
So I dnt really get the pt of replace

Transclude: to pick up the content of the actual stuff in the html inside the tag(balise)
and drop it down where I declare my ng-transclude:)

***Communicating with mother controller/ scope
-Use an attribute to pass data (the data will be from parent controller).
In the attribute you pass a property of scope, so dont use {{}}, just put the name of the 
property

-In the link function you dont put $scope but just scope


-The transclude allows you to communicate with the mother controller !
In the transclude we want bulky data and not just small things that can be passed thru attributes

*/ 

