var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');
var User = require('../models/user');

/* Returns true if all entries in map1 are also found in map2. */
function isSubMap(map1, map2) {
	for (key in map1) {
		if (map1[key] != map2[key]) {
			return false;
		}
	}
	return true;
}

/* Usage: mapping 'loved' restaurants to number of times loved */
function Map() {
    this.keys = new Array();
    this.data = new Object();

    this.put = function (key, value) {
        if (this.data[key] == null) {
            this.keys.push(key);
        }
        this.data[key] = value;
    };

    this.contains = function (key) {
    	for(var i = 0; i < this.keys.length; i++){
    		if(this.keys[i] == key){
    			return true;
    		}
    	}
    	return false;
    }

    this.get = function (key) {
        return this.data[key];
    };

    this.entrys = function () {
        var len = this.keys.length;
        var entrys = new Array(len);
        for (var i = 0; i < len; i++) {
            entrys[i] = {
                restaurantId: this.keys[i],
                score: this.data[this.keys[i]]
            };
        }
        return entrys;
    };
}

/* Usage: preserve ordring for a Mongo $in query */
function createHash(results) {
	var hash = {};
	for(var i = 0; i < results.length; i++){
		var item = results[i];
		var id = item.restaurantId;
		hash[id] = item;
	}
	return hash;
}

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session:false}), function(req, res, next) {

    //extract query parameters
	var queriedName = req.query.name ? req.query.name : '';
	var queriedTags = req.query.tags ? JSON.parse(req.query.tags) : {};
	var queriedFoodTypes = req.query.food_types ? JSON.parse(req.query.food_types) : {};
	var queriedMeals = req.query.meals ? JSON.parse(req.query.meals) : {};

	/*
	Logic explanation

	1. sort user.ratings for all users and update the db
	2. compute user.similarity for THIS user
	3. sort user.similarity and update the db
	4. for each user U that's similar (>0.5), find U's "loved" restaurants
	5. compute user.topList for THIS user and update db
	6. return top 5 results from toplist
	7. if not enough restaurants from toplist, supplement it with generally-searched restaurants
	*/

    User.update(
    	{},
    	{
    		$push: {
    			ratings: {
    				$each: [],
    				$sort: {restaurantName: 1}
    			}
    		}
    	},
    	{multi:true},
    	function (err){
    		User.findOne({
    			username: req.user.username
    		}, function (err, thisUser){
    			User.find({
    				username: {
    					$not: {$eq: req.user.username}
    				}
    			}, function (err, otherUsers){
    				//array of ratings for this user
    				var thisRatings = thisUser.ratings;
    				//array of array of ratings for other
    				var otherRatings = [];
    				var otherUsernames = [];
    				otherUsers.forEach(function (u){
    					otherRatings.push(u.ratings);
    					otherUsernames.push(u.username);
    				});
    				//array of similarities
    				var newSimilarities = [];

    				//compute similarities between all other users
    				for(var i = 0; i < otherRatings.length; i++){
    					var curRatings = otherRatings[i];
    					var thisIndex = 0;
    					var otherIndex = 0;
    					var similarityAggregate = 0;
    					var totalMatches = 0;

    					while(thisIndex < thisRatings.length && otherIndex < curRatings.length){
    						if(thisRatings[thisIndex].restaurantName == curRatings[otherIndex].restaurantName){
    							//both users rated the same restaurant
    							if(thisRatings[thisIndex].rating == "dislike"){
    								if(curRatings[otherIndex].rating == "dislike"){
    									similarityAggregate += 1;
    								}
    								else if(curRatings[otherIndex].rating == "like"){
    									similarityAggregate += 0.2;
    								}
    								else if(curRatings[otherIndex].rating == "love"){
    									similarityAggregate += 0;
    								}
    							}
    							else if(thisRatings[thisIndex].rating == "like"){
									if(curRatings[otherIndex].rating == "dislike"){
    									similarityAggregate += 0.2;
    								}
    								else if(curRatings[otherIndex].rating == "like"){
    									similarityAggregate += 1;
    								}
    								else if(curRatings[otherIndex].rating == "love"){
    									similarityAggregate += 0.7;
    								}
    							}
    							else if(thisRatings[thisIndex].rating == "love"){
    								if(curRatings[otherIndex].rating == "dislike"){
    									similarityAggregate += 0;
    								}
    								else if(curRatings[otherIndex].rating == "like"){
    									similarityAggregate += 0.7;
    								}
    								else if(curRatings[otherIndex].rating == "love"){
    									similarityAggregate += 1;
    								}
    							}

    							totalMatches++;
    							otherIndex++;
    							thisIndex++;
    						}
    						else if(curRatings[otherIndex].restaurantName < thisRatings[thisIndex].restaurantName){
    							otherIndex++;
    						}
    						else{
    							thisIndex++;
    						}
    					} //end while to go through both sorted arrays of current pair of users

    					//add the similarity to the list for this user
    					var similarityScore = similarityAggregate / totalMatches;
    					newSimilarities.push({
    						username: otherUsernames[i],
    						score: similarityScore
    					});
    				} //end for loop between all other users

    				//sort the similarities
    				newSimilarities.sort(function (a,b){
    					return b.score - a.score;
    				});

    				//now we need to update this user's similarities
    				User.update(
    					{username: req.user.username},
    					{
    						$set:{
    							similarities: newSimilarities
    						}
    					}, function (err){
    						//find similar users (>0.5 similarity)
    						var similarUsers = [];
    						for(var i = 0; i < newSimilarities.length; i++){
    							if(newSimilarities[i].score >= 0.5){
    								similarUsers.push(newSimilarities[i].username);
    							}
    						}

    						//build new toplist for this user
    						User.find({
    							username: {
    								$in: similarUsers
    							}
    						}, function (err, similarUsersArray){
    							var m = new Map();
    							for(var i = 0; i < similarUsersArray.length; i++){
    								//grab that similar user's 'loved' restaurants
					    			var curSimilarUserRatings = similarUsersArray[i].ratings;
					    			var curSimilarUserLoved = [];

					    			for(var j = 0; j < curSimilarUserRatings.length; j++){
					    				if(curSimilarUserRatings[j].rating == "love"){
					    					curSimilarUserLoved.push(curSimilarUserRatings[j].restaurantId);
					    				}
					    			}

					    			//add similar user's 'loved' restaurants to our map
					    			for(var j = 0; j < curSimilarUserLoved.length; j++){
					    				if(m.contains(curSimilarUserLoved[j])){
					    					m.put(curSimilarUserLoved[j], m.get(curSimilarUserLoved[j]) + 1);
					    				}
					    				else{
					    					m.put(curSimilarUserLoved[j], 1);
					    				}
					    			}
    							} //end for loop through each similar user

    							//we now have 'm', a map of the toplist for this user
	    						var topListArray = m.entrys();

	    						//sort toplist in descending order
	    						topListArray.sort(function (a,b) {
	    							return  b.score - a.score;
	    						});

	    						//get just the ordered restaurantId values
	    						var topListIds = [];
	    						for(var q = 0; q < topListArray.length; q++){
	    							topListIds.push(topListArray[q].restaurantId);
	    						}

	    						//write the new toplist back
	    						User.update(
	    							{username: req.user.username},
	    							{
	    								$set:{
			    							topList: topListArray
			    						}
	    							}, function (err){
	    								//finally, we do the returning of search results (5)

										//find all the toplist restaurants
										Restaurant.find({
											restaurantId: {
												$in: topListIds
											}
										}, function (err, unorderedTopList){
											//repair the ordering from topListIds
											var topListRestaurants = [];
											var hash = createHash(unorderedTopList);
											for(var w = 0; w < topListIds.length; w++){
												var currentId = topListIds[w];
												var curRest = hash[currentId];
												topListRestaurants.push(curRest);
											}

											//filter the top restaurants by the filters requested
		    								topListRestaurants = topListRestaurants.filter(function (restaurant){
		    									var restaurantTags = restaurant['tags'][0];
												var restaurantFoodTypes = restaurant['food_types'][0];
												var restaurantMeals = restaurant['meals'][0];
												return (isSubMap(queriedTags, restaurantTags)
													&&	isSubMap(queriedFoodTypes, restaurantFoodTypes)
													&&	isSubMap(queriedMeals, restaurantMeals));
		    								});

		    								//we only return top 5 results
		    								if(topListRestaurants.length >= 5){
		    									res.send(topListRestaurants.slice(0,5));
		    								}
		    								else{
		    									//not enough toplist restaurants, supplement
		    									//with regularly searched restaurants
		    									var numRestaurantsNeeded = 5 - topListRestaurants.length;

		    									Restaurant.find({
													// Retrieve the list of all restaurants matching the queried restaurant
													// id and name.
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

													//send final list of restaurants to client:
													//toplist :: rest of restaurants
													res.send(topListRestaurants.concat(restaurants.slice(0, numRestaurantsNeeded)));
												})
												.sort('+restaurantId');
		    								}
											//end of logic
										});	    								
	    							}
	    						);
    						});
						}
					);
    			});
    		});
    	}
	); //end of highest-level User.update()

	/*the old code*/
/*	
	Restaurant.find({
		// Retrieve the list of all restaurants matching the queried restaurant
		// id and name.
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
        //res.send(req.user.ratings);
        // res.send(
        // 'It worked! User id is: ' + req.user._id + '.'
        //     + '\n' + req.user.username
        //         + '\n' + 'email: ' + req.user.email
        //             + '\n' + 'name: ' + req.user.firstName + ' ' + req.user.lastName    
        // );
	})
	.sort('+restaurantId');
*/	

});

module.exports = router;
