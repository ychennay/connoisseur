var express = require('express');
var router = express.Router();
var Bookmark = require('../models/bookmark');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Bookmark.find({}, function (err, bookmarks) {
    res.send(bookmarks);
  });
});

module.exports = router;