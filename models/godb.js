const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://ya4:${process.env.MONGODB_CLOUD_LTBA_PASSWORD}@cluster0.hg0zi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log(collection);
  client.close();
});

//User Schema
var UserSchema = client.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    }
});

//export User schema
var User = module.exports = client.model('User', UserSchema);

