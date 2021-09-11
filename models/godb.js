//using mongoose to connect mongodb
var mongoose = require('mongoose');
const uri = `mongodb+srv://ya4:${process.env.MONGODB_CLOUD_LTBA_PASSWORD}@cluster0.hg0zi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//User Schema
var Videolist = mongoose.Schema({
    streamble: {
        type: String
    }
});

//export User schema
var Videolist = module.exports = mongoose.model('videolist', VideolistSchema);

module.exports.createUser = function (newUser, callback) {
    //newUser.save(callback); //mongoose function to insert to DB
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};