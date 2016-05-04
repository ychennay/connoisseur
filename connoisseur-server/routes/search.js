var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');

function tagsMatch(queriedTagsObject, candidateTagsObject) {
	for (tagToMatch in queriedTagsObject) {
		if (queriedTagsObject[tagToMatch] != candidateTagsObject[tagToMatch]) {
			return false;
		}
	}
	return true;
}

/* GET users listing. */
router.get('/', function(req, res, next) {

	var queriedName = req.query.name ? req.query.name : '';
	var queriedUsername = req.query.username ? req.query.username : '';
	var queriedTags = req.query.tags ? req.query.tags : '{}';

	Restaurant.find({
		name : new RegExp('^.*' + queriedName + '.*$', "i"),
		username : new RegExp('^.*' + queriedUsername + '.*$', "i"),
	}, function (err, restaurants) {
		var queriedTagsObject = JSON.parse(queriedTags);
		var tagsMatchedRestaurants = restaurants.filter(function(restaurant) {
			var restaurantTagsObject = restaurant['tags'];
			return tagsMatch(queriedTagsObject, restaurantTagsObject);
		});
		res.send(tagsMatchedRestaurants);
	})
	.limit(5)
	.sort('+name');
});

module.exports = router;