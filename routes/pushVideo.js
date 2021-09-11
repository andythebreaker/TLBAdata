var express = require('express');
var router = express.Router();

//import Data Model
var Videolist = require('../models/godb');

/* GET users listing. */
router.get('/', function (req, res, next) {
  var newVideolist = new Videolist({
    streamable: `${Date.now()}`
  });

  Videolist.pushVideolist(newVideolist, function (err) {
    //track for error
    if (err) {
      console.log(err);
    }
  });
  res.send('respond with a resource');
});

module.exports = router;
