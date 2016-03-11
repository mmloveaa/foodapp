'use strict';


var app = angular.module('foodApp');

// inject the dependency in it via $scope
app.controller('foodCtrl', function ($scope, FoodService) {
	console.log('woo! foodCtrl!');


	FoodService.fetch()
	.then(function(res) {
		console.log('res: ', res);
		var foods = res.data;
		// console.log("foods: ", foods)
		$scope.foods = foods;
	}, function (err) {
		console.error('err: ', err);
	});

	 $scope.addFood = function () {
	 	console.log($scope.newFood);

	 	switch($scope.newFood.type) {
	 		case "japanese":
	 			  $scope.newFood.imgUrl = "http://i.imgur.com/wDdHQUR.jpg"
	 			  $scope.newFood.description = "1 California roll , 4 pieces of sushi"
	 			  break;
		  case "chinese":
				  $scope.newFood.imgUrl = "http://i.imgur.com/F54wt7a.jpg"
				  $scope.newFood.description = "Delicious fried rice"
				  break;
		  case "italian":
				  $scope.newFood.imgUrl = "http://i.imgur.com/AfbpKTJ.jpg"
				  $scope.newFood.description = "irresistible lasagna "
				  break;
			case "american":
				  $scope.newFood.imgUrl = "http://i.imgur.com/R72rW81.jpg"
				  $scope.newFood.description = "Eat this Burger NOW"
				  break;	  
	 	}
	 

	 	FoodService.create($scope.newFood)
	 	.then(function (res) {
	 		$scope.foods.push(res.data) 
	 		// console.log('res: ', res);
	 	}, function (err) {
	 		console.error('err:', err);
	 	})
	 };

	 $scope.removeFood = function(food) {
	 	// console.log('shoe', shoe);
	 	console.log("Hello")
	 	// debugger;
	 	FoodService.remove(food)
	 	.then(function() {
	 		//success
	 		var index = $scope.foods.indexOf(food);
	 		$scope.foods.splice(index, 1);
	 	}, function (err){
	 		console.error('err:' , err);
	 	})
	 };


	 $scope.editFood = function(food) {
	 	  // editing input
	 	  $scope.foodToEdit = angular.copy(food);
	 		// $scope.editingFood = true;
	 };

	 $scope.showDetail = function(thisFood) {
	 	if(!$scope.showDetails){
	 	 $scope.showDetails = true;
	 	 $scope.detailedFood = thisFood;
	 	} else {
	 		$scope.showDetails = false;
	 	}
	 }

});
	 		