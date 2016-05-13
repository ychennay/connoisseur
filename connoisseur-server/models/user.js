/**
 * Created by tygiacalone on 4/22/16.
 */

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');

// create a schema
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    location: [{ 
        lattitude: Number,
        longitude: Number
    }],
    ratings: [{
        restaurantId: String,
        rating: {
            type: String,
            enum: ['love', 'like', 'dislike']
        }
    }],
    similarities: [{
        username: String,
        score: Number
    }],
    topList: [{
        restaurantId: String,
        score: Number
    }],
    created_at: Date,
    updated_at: Date
});


// Saves the user's password hashed
userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bCrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bCrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


userSchema.methods.comparePassword = function(password, callback) {
    console.log(password);
    console.log(this.password);
    return bCrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;