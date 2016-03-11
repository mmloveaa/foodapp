'use strict';

var app = angular.module('foodApp');

app.service('FoodService' , function ($http){

		this.sayHi = function($http) {
			console.log('hi!');
		};

		this.fetch = function() {
			console.log('in fetch')
			return $http.get('/foods');
		};

		this.create = function(newFood) {
			return $http.post('/foods', newFood);
		};

		this.remove = function(food) {
			console.log(food)
			return $http.delete(`/foods/${food.id}`);
		};

		// var promise = $http.get('/foods');

		// promise.then(function (res){
		// 	console.log('res: ', res);
		// }, function (err) {
		// 	console.error('err: ', err);
		// });

	});

// app.controller('foodCtrl', function(FoodFactory) {
// 		FoodFactory.fetch()
// 	})