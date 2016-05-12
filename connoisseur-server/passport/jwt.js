/**
 * Created by tygiacalone on 5/11/16.
 */

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var passport = require('passport');

// Setup work and export for the JWT passport strategy

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'server secret';

passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    User.findOne({_id: jwt_payload._doc._id}, function(err, user) {
        //console.log(user.username);
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

module.exports = passport;