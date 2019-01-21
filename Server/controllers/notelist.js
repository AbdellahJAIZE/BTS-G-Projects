'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//connect to db
mongoose.connect('mongodb://localhost/G-Projects');
// create a schema
var noteSchema = new Schema({
      title : String,
      content: String,
      red: Number,
      green: Number,
      blue: Number,
      alpha: Number,
      dateCreated: Date
    });
//Compiling note schema model
var Note = mongoose.model('notes', noteSchema);

exports.list_all_notes = function (req, res) {

    Note.find({}, function (err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};

exports.create_a_note = function (req, res) {
    var new_note = new Note(req.body);
    new_note.save(function (err, note) {

        if (err)
            res.send(err);
        res.json(note);
    });

};

exports.delete_a_note = function (req, res) {
    var new_note = new Note(req.body);
    new_note.remove(function (err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });

};


exports.read_a_note = function (req, res) {

    Note.find({"_id" : req.params.noteId}, function (err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};
