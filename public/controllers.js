'use strict';


var app = angular.module('foodApp');

// inject the dependency in it via $scope
app.controller('foodCtrl', function($scope, FoodService) {
  console.log('woo! foodCtrl!');


  FoodService.fetch()
    .then(function(res) {
      // console.log('res: ', res);
      var foods = res.data;
      
      // console.log("foods: ", foods)
      $scope.foods = foods;
    }, function(err) {
      console.error('err: ', err);
    });

  $scope.addFood = function() {
    console.log($scope.newFood);

    switch ($scope.newFood.type) {
      case "japanese":
        $scope.newFood.imgUrl = "https://i.imgur.com/wDdHQUR.jpg"
        $scope.newFood.description = "1 California roll , 4 pieces of sushi"
        break;
      case "chinese":
        $scope.newFood.imgUrl = "https://i.imgur.com/F54wt7a.jpg"
        $scope.newFood.description = "Delicious fried rice"
        break;
      case "italian":
        $scope.newFood.imgUrl = "https://i.imgur.com/AfbpKTJ.jpg"
        $scope.newFood.description = "irresistible lasagna "
        break;
      case "american":
        $scope.newFood.imgUrl = "https://i.imgur.com/R72rW81.jpg"
        $scope.newFood.description = "Eat this Burger NOW"
        break;
    }


    FoodService.create($scope.newFood)
      .then(function(res) {
        $scope.foods.push(res.data)
        // console.log('res: ', res);
      }, function(err) {
        console.error('err:', err);
      })
  };

  $scope.removeFood = function(food) {
    // console.log('shoe', shoe);
    console.log("food: ", food)
    // debugger;
    FoodService.remove(food)
      .then(function() {
        //success
        // var id = food.id;
        var index = $scope.foods.indexOf(food);
        $scope.foods.splice(index, 1);
        swal("You successfully deleted this!")
      }, function(err) {
        console.error('err:', err);
      })
  };


  var editedFood;

  $scope.editFood = function(food) {
    editedFood = this.$index;
    var newEditObject = angular.copy(food);
    newEditObject.date = new Date(newEditObject.date);
    // debugger;  // put in a debugger, we see the food argument we passed in is undefined
    // also model is not a date object.... in the detail view, need to change string to obj
    $scope.editObj = newEditObject;
  }

  $scope.updateFood = function(editedFood) {
    // console.log(this.editObj);
    // console.log("is this updateFood function working?")
    FoodService.update($scope.editObj)
      .then(function(res) {
        $scope.foods.splice(editedFood, 1, $scope.editObj)
        swal("Good job!", "You edited the detail" , "success")
        // console.log("scope editObj: ", $scope.editObj);
      }, function(error) {
        console.log("errors from put");
      });
  }


  // $scope.editFood = function(food) {
  // 	  // editing input
  // 	  $scope.foodToEdit = angular.copy(food);
  // 		// $scope.editingFood = true;
  // };

  $scope.showDetail = function(thisFood) {
    if (!$scope.showDetails) {
      $scope.showDetails = true;
      $scope.detailedFood = thisFood;
    } else {
      $scope.showDetails = false;
    }
  }

});