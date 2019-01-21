'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//connect to db
mongoose.connect('mongodb://localhost/G-Projects');
// create a schema
var projectSchema = new Schema({
      name: String,
      model: String,
      dateCreated: Date,
      comment: String,
      idGroup: String
    });

//Compiling note schema mod
var Project = mongoose.model('Projects', projectSchema);

exports.list_all_projects_in_group_x = function (req, res) {
    Project.find({"idGroup": req.params.groupId}, function (err, project) {
        if (err)
            res.send(err);
        res.json(project);
    });
};

exports.list_all_projects = function (req, res) {

    Project.find({}, function (err, project) {
        if (err)
            res.send(err);
        res.json(project);
    });
};

exports.create_a_project = function (req, res) {
    var new_project = new Project(req.body);
    new_project.save(function (err, project) {
        if (err)
            res.send(err);
        res.json(project);
    });

};


exports.delete_a_project = function (req, res) {
    var new_project = new Project(req.body);
    new_project.remove(function (err, project) {
        if (err)
            res.send(err);
        res.json(project);
    });

};

exports.read_a_project = function (req, res) {
    Project.find({"_id" : req.params.projectId}, function (err, project) {
        if (err)
            res.send(err);
        res.json(project);
    });
};
