'use strict';

//  Shoe model
//  Contains methods to interact with shoe data

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var foodsFilepath = path.join(__dirname, '../data/food.json');

exports.get = function(cb) {
  fs.readFile(foodsFilepath, function(err, data) {
  	console.log("data: ", data)
    if(err) return cb(err);
    var foods = JSON.parse(data);
  	console.log('foods' , foods)
    cb(null, foods);
  });
};

exports.create = function(newFood, cb) {
  this.get((err, foods) => {  // read and parse
    if(err) return cb(err);
    newFood.id = uuid();
    foods.push(newFood);   // modify
    this.write(foods, function(err) {
      cb(err, newFood);
    });  // stringify and write
  });
};

exports.write = function(foods, cb) {
  fs.writeFile(foodsFilepath, JSON.stringify(foods), cb);
};


exports.delete = function(id, cb) {
  // get the array of foods
  // remove the food with the given id from the array
  // write the modified array back to the db

  this.get((err, foods) => {

    var length = foods.length;

    foods = foods.filter(function(food) {
      return food.id !== id;
    });

    if(length === foods.length) {
      cb( {err: "Food not found."} );
      return;
    }

    this.write(foods, cb);
  });
};


exports.update = function(id, updatesObj, cb) {

  this.get((err, foods) => {
    var updatedFood;

    foods = foods.map(function(food) {
      if(food.id === id) {
        // do the update
        for(var key in updatesObj) {
          food[key] = updatesObj[key];
        }
        updatedFood = food;
      }
      return food;
    });

    if(!updatedFood) {
      cb( {err: "Food not found."} );
      return;
    }

    this.write(foods, function(err) {
      cb(err, updatedFood)
    });
  });
};












