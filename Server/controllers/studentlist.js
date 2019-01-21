'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//connect to db
mongoose.connect('mongodb://localhost/G-Projects');
// create a schema
var studentSchema = new Schema({
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      comment: String,
      idGroup: String
    });

//Compiling note schema mod
var Student = mongoose.model('Students', studentSchema);

exports.list_all_students_in_group_x = function (req, res) {
    Student.find({"idGroup": req.params.groupId}, function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};

exports.create_a_student = function (req, res) {
    var new_student = new Student(req.body);
    new_student.save(function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });

};


exports.delete_a_student = function (req, res) {
    var new_student = new Student(req.body);
    new_student.remove(function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });

};

exports.read_a_student = function (req, res) {
    Student.find({"_id" : req.params.studentId}, function (err, student) {
        if (err)
            res.send(err);
        res.json(student);
    });
};
