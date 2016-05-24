/**
 * Created by tygiacalone on 4/22/16.
 */

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bookmarkSchema = new Schema({
    restaurantId: String,
    username: String,
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Bookmark = mongoose.model('Bookmark', bookmarkSchema);

// make this available to our users in our Node applications
module.exports = Bookmark;