'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//connect to db
mongoose.connect('mongodb://localhost/G-Projects');
// create a schema
var groupSchema = new Schema({
      name: String,
      dateCreated: Date,
      comment: String,
      idSession: String
    });

//Compiling note schema mod
var Group = mongoose.model('Groups', groupSchema);

exports.list_all_groups_in_session_x = function (req, res) {
    Group.find({"idSession": req.params.sessionId}, function (err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
};

exports.list_all_groups = function (req, res) {

    Group.find({}, function (err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
};


exports.create_a_group = function (req, res) {
    var new_group = new Group(req.body);
    new_group.save(function (err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });

};


exports.delete_a_group = function (req, res) {
    var new_group = new Group(req.body);
    new_group.remove(function (err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });

};

exports.read_a_group = function (req, res) {
    Note.find({"_id" : req.params.noteId}, function (err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};
