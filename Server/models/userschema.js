'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//connect to db
mongoose.connect('mongodb://localhost/azerty');



// create a schema
var userSchema = new Schema({
  firstName: String,
  lastName:  String,
  age: Number,
  skills: []
});



var User = mongoose.model('Users', userSchema);

module.exports = User;
