var mongoose = require('mongoose');

/*USAGE:
get a new index to use : call -> popIndex(callbackFUCN(...)=>{...});
mark any index as empty (aka.: del. action on virtual array) : call -> pushPointerlist(int indexToMark, callbackFUCN(...)=>{...});
*/

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

module.exports.delPointerlist = function (var_del_index, callback) {
    Pointerlist.deleteOne({ index: var_del_index }, function (err) {
        if (err) {
            callback(err);
        } else {
            callback();
        }
    });
};

module.exports.getEmptyIndex = function (callback) {
    Pointerlist.find({ "lastpointer": -1 }, function (err, m_set) {
        if (err || m_set.length === 0) {
            callback(-1);
        } else {
            callback(m_set[0].index);
        }
    });
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
            gotObj.save(callback);
        }
    });
};

module.exports.getPointerIndex = function (callback) {
    Pointerlist.findOne({ index: { $eq: -1 } }, function (err, gotObj) {
        if (err) {
            console.log(err);
            callback(-1);
        } else {
            callback(gotObj.lastpointer);
        }
    });
};

module.exports.popIndex = function (callback) {
    Pointerlist.getEmptyIndex((res) => {
        if (res === -1) {
            Pointerlist.setPointer((err) => {
                if (err) {
                    callback(-1);
                } else {
                    Pointerlist.getPointerIndex((goodindex) => {
                        callback(goodindex);
                    });
                }
            });
        } else {
            Pointerlist.delPointerlist(res, (err) => {
                if (err) {
                    console.log(err);
                    callback(-1);
                } else {
                    callback(res);
                }
            });
        }
    });
};