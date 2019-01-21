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



var Note = mongoose.model('Notes', noteSchema);

module.exports = note;
