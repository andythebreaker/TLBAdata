var mongoose = require('mongoose');

//pointer Schema
var PointerlistSchema = mongoose.Schema({
    index: {
        type: Number
    },
    lastpointer: {
        type: Number
    }
});

//export User schema
var Pointerlist = module.exports = mongoose.model('pointerlist', PointerlistSchema); //this name will be the page name of DB?

module.exports.pushPointerlist = function (var_empty_index, callback) {
    var tmpPointerlist = new Pointerlist({
        index: var_empty_index,
        lastpointer: -1
    });
    tmpPointerlist.save(callback);
};

module.exports.setPointer = function (callback) {
    Pointerlist.findOne({ index: { $eq: -1 } }, function (err, gotObj) {
        console.log(gotObj);
        if (err) {
            callback(err);
        } else if (!gotObj) {
            var tmpPointerlist = new Pointerlist({
                index: -1,
                lastpointer: 0
            });
            tmpPointerlist.save(callback);
        } else {
            console.log(gotObj.lastpointer);
            gotObj.lastpointer += 1;
            gotObj.save();
            callback();
        }
    });
};
