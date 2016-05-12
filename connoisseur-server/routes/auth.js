var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', passport.authenticate(
    'local', {
      session: false
    }), serialize, generateToken, respond);

module.exports = router;
