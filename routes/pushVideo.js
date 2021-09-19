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

router.post('/', function (req, res, next) {
  Videolist.pushVideolist(req.body.streamable, function (err) {
    if (err) {
      res.send('!error!');
    } else {
      res.send('!ok!');
    }
  });
});

router.post('/del', function (req, res, next) {
  Videolist.delVideoItem(req.body.streamable, function (err) {
    if (err) {
      res.send('!error!');
    } else {
      res.send('!ok!');
    }
  });
});

module.exports = router;
