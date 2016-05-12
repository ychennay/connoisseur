var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');

/* Returns true if all entries in map1 are also found in map2. */
function isSubMap(map1, map2) {
	for (key in map1) {
		if (map1[key] != map2[key]) {
			return false;
		}
	}
	return true;
}

/* GET users listing. */
router.get('/', function(req, res, next) {

	var queriedRestaurantId = req.query.restaurantId ? req.query.restaurantId : '';
	var queriedName = req.query.name ? req.query.name : '';
	var queriedTags = req.query.tags ? JSON.parse(req.query.tags) : {};
	var queriedFoodTypes = req.query.food_types ? JSON.parse(req.query.food_types) : {};
	var queriedMeals = req.query.meals ? JSON.parse(req.query.meals) : {};

	Restaurant.find({
		// Retrieve the list of all restaurants matching the queried restaurant
		// id and name.
		restaurantId : new RegExp('^.*' + queriedRestaurantId + '.*$', "i"),
		name : new RegExp('^.*' + queriedName + '.*$', "i")
	}, function (err, restaurants) {
		// Filter the restaurants to only those matching the queried tags, food
		// types, and meals.
		restaurants = restaurants.filter(function(restaurant) {
			var restaurantTags = restaurant['tags'][0];
			var restaurantFoodTypes = restaurant['food_types'][0];
			var restaurantMeals = restaurant['meals'][0];
			return (isSubMap(queriedTags, restaurantTags)
				&&	isSubMap(queriedFoodTypes, restaurantFoodTypes)
				&&	isSubMap(queriedMeals, restaurantMeals));
		});
		// Send final list of restaurants to client.
		res.send(restaurants);
	})
	.sort('+restaurantId');
});

module.exports = router;