'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//connect to db
mongoose.connect('mongodb://localhost/G-Projects');
// create a schema
var sessionSchema = new Schema({
      sessionYear: Number,
      dateLastVisited: Date,
      dateCreated: Date,
      comment: String
    });

//Compiling session schema model
var Session = mongoose.model('Sessions', sessionSchema);


exports.list_all_sessions = function (req, res) {

    Session.find({}, function (err, session) {
        if (err)
            res.send(err);
        res.json(session);
    });
};

exports.create_a_session = function (req, res) {
    var new_session = new Session(req.body);
    new_session.save(function (err, session) {

        if (err)
            res.send(err);
        res.json(session);
    });

};

exports.delete_a_session = function (req, res) {
    var new_session = new Session(req.body);
    new_session.remove(function (err, session) {
        if (err)
            res.send(err);
        res.json(session);
    });

};


exports.read_a_session = function (req, res) {

    Session.findById(req.params.sessionId, function (err, session) {
        if (err)
            res.send(err);
        res.json(session);
    });
};
