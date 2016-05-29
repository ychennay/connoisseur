var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');
var https = require('https');
var apiKey = "AIzaSyD5rce1L1jaSF4rqi2l4WTP2dH7zJR0VEE";

router.post('/', function(req, res, next) {

    var address = req.body.address;
    var cleanedAddress = address.replace(/ /i, "+");
    console.log(cleanedAddress);
    var latLongApiAddress = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cleanedAddress + "&key=" + apiKey;

    https.get(latLongApiAddress, function(apiResponse) {
        var data = '';
        apiResponse.on('data', function(chunk) {
            data += chunk.toString();
        });
        apiResponse.on('end', function() {
            var dataObject = JSON.parse(data);
            var latitude = dataObject["results"][0]["geometry"]["location"]["lat"];
            var longitude = dataObject["results"][0]["geometry"]["location"]["lng"];
            new Restaurant({
                restaurantId: req.body.restaurantId,
                name: req.body.name,
                imgPath: req.body.imgPath,
                location: req.body.location,
                latitude: latitude,
                longitude: longitude,
                tags: req.body.tags,
                price: req.body.price,
                meals: req.body.meals,
                menu: req.body.menu,
                address: address,
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
    });
});

module.exports = router;