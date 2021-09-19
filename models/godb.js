//using mongoose to connect mongodb
var mongoose = require('mongoose');
const mongoDBuserName = "ya4";
const mongoDBpsw = process.env.MONGODB_CLOUD_LTBA_PASSWORD;
const mongoDBdataBaseName = "maindb";
const uri = `mongodb+srv://${mongoDBuserName}:${mongoDBpsw}@cluster0.hg0zi.mongodb.net/${mongoDBdataBaseName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var Pointerlist_inmod = require('./pointer');

//User Schema
var VideolistSchema = mongoose.Schema({
    index: {
        type: Number
    },
    streamable: {
        type: String
    }
});

//export User schema
var Videolist = module.exports = mongoose.model('videolist', VideolistSchema); //this name will be the page name of DB?

module.exports.pushVideolist = function (var_string_streamable_id, callback) {
    Videolist.existence(var_string_streamable_id, function (err, gotObj) {
        console.log(gotObj);
        if (err) {
            callback(err);
        } else if (!gotObj) {
            Pointerlist_inmod.popIndex(function (respopIndex) {
                var newVideolist = new Videolist({
                    index: respopIndex || -1,
                    streamable: `${var_string_streamable_id}`
                });
                newVideolist.save(callback);
            });
        } else {
            callback();
        }
    });
};

module.exports.existence = function (streamable_id, callback) {
    console.log(streamable_id);
    var query = { streamable: { $eq: streamable_id } };
    Videolist.findOne(query, callback);
}

module.exports.delVideoItem = function (var_string_streamable_id, callback) {
    Videolist.existence(var_string_streamable_id, function (err, gotObj) {
        console.log(gotObj);
        if (err) {
            callback(err);
        } else if (!gotObj) {
            callback(-1);
        } else {
            Pointerlist_inmod.pushPointerlist(gotObj.index, () => {
                Videolist.deleteOne({ streamable: var_string_streamable_id }, function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
            });
        }
    });
}