var express = require('express');
var router = express.Router();
var passport = require('passport');
var Rating = require('../models/rating');
var User = require('../models/user');

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    
    var restaurantId = req.body.restaurantId;
    var username = req.user.username;
    var rating = req.body.rating;

    User.findOneAndUpdate({
        username: username
    }, {
        $push: {
            ratings: {
                restaurantId: restaurantId,
                rating: rating
            }
        }
    }, {
        upsert: false
    }, function(err) {
        new Rating({
            restaurantId: restaurantId,
            username: username,
            rating: rating,
            created_at: Date.now(),
            updated_at: Date.now()
        }).save( function(err) {
            if (err) {
                res.sendStatus(400);
                console.log(err);
            }
            else {
                res.sendStatus(200);
            }
        });
    });
});

module.exports = router;
