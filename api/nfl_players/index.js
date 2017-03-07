var datastore = require('./datastore');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
var config = require('../../config');

var mongoDb;

var url = config.mongodbUri;

MongoClient.connect(url, function(err, db) {
                    assert.equal(null, err);
                    config.logStars("Connected correctly to server.");
                    mongoDb = db;
                    });

// Get list of nfl_players
exports.index = function(req, res) {
    // Connect to the db
    if (mongoDb){
        var collection = mongoDb.collection('NFL');
        collection.find().toArray(function(err, items) {
                                  res.send(items);
                                  });
    }
    else
    {
        config.logStars('No database object!');
        res.status(404).send({});
    }
};
// Creates a new nfl_player.
exports.create = function(req, res) {
    var nfl_player = req.body;
    if (mongoDb){
        var collection = mongoDb.collection('NFL');
        collection.insertOne(nfl_player, function(err, result) {
                             assert.equal(err,null);
                             config.logStars('Inserted: ' + JSON.stringify(result));
                             res.status(200).send(result);
                             
                             });
    }
    else
    {
        config.logStars('No database object!');
    }
    
};

// Update an existing nfl_player.
exports.update = function(req, res) {
    var id = req.params.id;
    var nfl_player = req.body;
    config.logStars('Updating contact: ' + id);
    var collection = mongoDb.collection('NFL');
    collection.updateOne({'_id':ObjectId(id)}, nfl_player, function(err, result) {
                         assert.equal(err,null);
                         console.log('' + result + ' document(s) updated');
                         res.status(200).send(result);
                         });
    
};
// delete an existing contact.
exports.delete = function(req, res) {
    var id = req.params.id;
    config.logStars('Deleting contact: ' + id);
    var collection = mongoDb.collection('NFL');
    collection.deleteOne({'_id':ObjectId(id)}, function(err, result) {
                         assert.equal(err,null);
                         console.log('' + result + ' document(s) deleted');
                         res.status(200).send(result);
                         });
    
};
