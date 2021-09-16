var express = require('express');
var router = express.Router();

//import Data Model
var Pointerlist = require('../models/pointer');

router.post('/', function (req, res, next) {
    Pointerlist.setPointer(function (err) {
        if (err) {
            res.send('!error!');
        } else {
            res.send('!ok!');
        }
    });
});

router.post('/popIndex', function (req, res, next) {
    Pointerlist.popIndex(function (respopIndex) {
        res.send(String(respopIndex));
    });
});

router.post('/addEmptyIndex', function (req, res, next) {
    Pointerlist.pushPointerlist(req.body.tmp, function (err) {
        if (err) {
            res.send('!error!');
        } else {
            res.send('!ok!');
        }
    });
});

module.exports = router;
