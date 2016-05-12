/**
 * Created by tygiacalone on 4/22/16.
 */

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');

// create a schema
var userSchema = new Schema({
    id: String,
    username: { type: String, required: true, unique: true },
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    location: String,
    created_at: Date,
    updated_at: Date
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