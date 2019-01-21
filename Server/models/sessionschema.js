'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//connect to db
mongoose.connect('mongodb://localhost/G-Projects');



// create a schema
var sessionSchema = new Schema({
      sessionYear: Date,
      dateLastVisited: Date,
      dateCreated: Date,
      comment: String,
      groups: [{
        dateVisited: Date,
        comment: String,
        students: [{
          fullName: String,
          email: String,
          phone: Number,
          comment: String
          }],
        projects :[{
          dateCreated:Date,
          modele: String,
          comment: String,
          documents:[{
            name:String,
            path:String,
            dateCreated:Date
          }]
        }]
      }]
    });



var Session = mongoose.model('Sessions', sessionSchema);

module.exports = Session;
