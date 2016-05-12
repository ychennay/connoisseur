var express = require('express');
var router = express.Router();
var Rating = require('../models/rating');

router.post('/', function(req, res, next) {

    new Rating({
        restaurantId: req.body.restaurantId,
        username: req.body.username,
        rating: req.body.rating,
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

module.exports = router;