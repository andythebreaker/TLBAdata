var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://ya4:${process.env.MONGODB_CLOUD_LTBA_PASSWORD}@cluster0.hg0zi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("maindb").collection("videolist");
  // perform actions on the collection object
  console.log(collection.s.db);
  client.close();
});
  res.render('index', { title: 'Express' });
});

module.exports = router;

