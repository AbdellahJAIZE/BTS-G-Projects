'use strict';

module.exports = function(app) {
  var sessionList = require('../controllers/sessionlist');
  var noteList = require('../controllers/notelist');
  var groupList = require('../controllers/grouplist');
  var studentList = require('../controllers/studentlist');
  var projectList = require('../controllers/projectlist');



  // session
  app.route('/sessions')
    .get(sessionList.list_all_sessions)
    .post(sessionList.create_a_session);
  app.route('/sessions/:sessionId')
    .get(sessionList.read_a_session);
  app.route('/sessions/delete')
    .delete(sessionList.delete_a_session);
  //
  //
  //
  //notes
  app.route('/notes')
    .get(noteList.list_all_notes)
    .post(noteList.create_a_note);
  app.route('/notes/:noteId')
    .get(noteList.read_a_note);
  app.route('/notes/delete')
    .delete(noteList.delete_a_note);
  //
  //
  //
  //groups
  app.route('/groups')
    .get(groupList.list_all_groups)
    .post(groupList.create_a_group);
  app.route('/groups/:sessionId')
    .get(groupList.list_all_groups_in_session_x);
  app.route('/groups/delete')
    .delete(groupList.delete_a_group);

  //
  //
  //
  //students
  app.route('/students')
    .post(studentList.create_a_student);
  app.route('/students/delete')
    .delete(studentList.delete_a_student);
  app.route('/students/:groupId')
    .get(studentList.list_all_students_in_group_x);

  //
  //
  //
  //students
  app.route('/projects')
    .get(projectList.list_all_projects)
    .post(projectList.create_a_project);
  app.route('/projects/delete')
    .delete(projectList.delete_a_project);
  app.route('/projects/:groupId')
    .get(projectList.list_all_projects_in_group_x);




};
