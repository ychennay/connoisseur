var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.post('/', function(req, res, next) {

    new Restaurant({
        name: req.body.name,
        username: req.body.username,
        tags: req.body.tags,
        food_types: req.body.food_types,
        location: req.body.location,
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