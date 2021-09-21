var express = require('express');
var router = express.Router();

var Videolist = require('../models/godb');

/* GET home page. */
router.get('/', function (req, res, next) {
  Videolist.count_all_documents_collection(function (return_count) {
    res.render('index', {
      title: 'TLBAdata',
      streamableVideoCount: `streamableVideoCount:${return_count}`
    });
  });

});

module.exports = router;

