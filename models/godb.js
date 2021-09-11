//using mongoose to connect mongodb
var mongoose = require('mongoose');
const mongoDBuserName = "ya4";
const mongoDBpsw = process.env.MONGODB_CLOUD_LTBA_PASSWORD;
const mongoDBdataBaseName = "maindb";
const uri = `mongodb+srv://${mongoDBuserName}:${mongoDBpsw}@cluster0.hg0zi.mongodb.net/${mongoDBdataBaseName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//User Schema
var VideolistSchema = mongoose.Schema({
    streamable: {
        type: String
    }
});

//export User schema
var Videolist = module.exports = mongoose.model('videolist', VideolistSchema); //this name will be the page name of DB?

module.exports.pushVideolist = function (newSchema, callback) {
    newSchema.save(callback);
};