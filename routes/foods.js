'use strict';

var express = require('express');
var router = express.Router();

var Food = require('../models/food');

router.get('/', function(req, res) {
	console.log('in get route')
	// res.send("ok");
  Food.get(function(err, foods) {
    if(err) {
    	// console.log('err: ', err)
      res.status(400).send(err);
      return;
    }
   console.log('foods' , foods)
    res.send(foods);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Food.get(function(err, foods) {
    if(err) {
      res.status(400).send(err);
      return;
    }

    var food = foods.find(function(obj) {
      return obj.id === id;
    });

    if(!food) {
      res.status(404).send({err: "Food not found"});
      return;
    }
    res.send(food);
  });
});

router.post('/', function(req, res) {
  var newFood = req.body;
  console.log('before: ', newFood);

  Food.create(newFood, function(err, savedFood) {

    console.log('after: ', newFood); // it does have the id,
    // because it is the same object
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(savedFood);
    }
  });
});

// DELETE /foods/72d62688-35c1-4990-8192-95fbfee87b03
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Food.delete(id, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var updatesObj = req.body;
  Food.update(id, updatesObj, function(err, updatedFood) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(updatedFood);
    }
  });
});


module.exports = router;


