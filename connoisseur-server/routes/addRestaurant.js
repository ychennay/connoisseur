var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.post('/', function(req, res, next) {

    new Restaurant({
        name: req.body.name,
        username: req.body.username,
        location: req.body.location,
        tags: req.body.tags,
        price: req.body.price,
        meals: req.body.meals,
        menu: req.body.menu,
        address: req.body.address,
        phone_number: req.body.phone_number,
        reviews: req.body.reviews,
        food_types: req.body.food_types,
        notes: req.body.notes,
        website: req.body.website,
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