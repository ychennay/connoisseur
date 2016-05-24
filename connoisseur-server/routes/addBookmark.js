var express = require('express');
var router = express.Router();
var passport = require('passport');
var Rating = require('../models/rating');
var User = require('../models/user');
var Bookmark = require('../models/bookmark');

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    
    var restaurantId = req.body.restaurantId;
    var username = req.user.username;

    Bookmark.findOne({
        restaurantId: restaurantId
    }, function (err, theRestaurant) {
        User.findOneAndUpdate({
            username: username
        },{
            $pull: {
                ratings: {
                    restaurantId: restaurantId
                }
            }
        }).then(function (theUser) {
            User.update({
                _id: theUser["_id"]
            },{
                $push: {
                    ratings: {
                        restaurantId: restaurantId,
                        restaurantName: theRestaurant.name
                    }
                }
            }, function (e) {});
        });
    });
});

module.exports = router;
