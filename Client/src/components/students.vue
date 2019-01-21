<template>
<div>
  <navigation title="Students"></navigation>
  <v-container>
    <v-layout row wrap class="mb-3" v-for="(student, index) in students" :key="index">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info" color="cyan darken-2">
          <v-container fluid>
            <v-layout row>
              <v-flex>
                <v-card-title class="pb-0" primary-title>
                  <div>
                    <h5 class="white--text">{{student.firstName}} {{student.lastName}}</h5>
                    <span class="white--text block">email: {{student.email}}</span>
                    <span class="white--text block">phone: {{student.phone}}</span>
                    <span class="white--text block">comment : {{student.comment}}</span>
                  </div>
                </v-card-title>
                <v-card-actions class="pt-0">
                  <v-spacer></v-spacer>
                  <v-btn v-on:click.stop="deleteStudent(student.id,index,true) " color="error">
                    <v-icon left>delete</v-icon>
                    Delete
                  </v-btn>
                  <v-btn v-on:click.stop="editStudent(student.id); editStudentDialog = true " color="info">
                    <v-icon left>edit</v-icon>
                    edit
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- Start Dialog -->
  <!-- <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn fixed right bottom fab dark slot="activator" color="info">
                <v-icon dark>add</v-icon>
            </v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Greate Group</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Name" v-model="name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Comment" v-model="comment" multi-line></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="SendToDb();dialog = false">Create group</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
  <!-- End Dialog -->
  <!-- Start Projects Dialog -->
  <!-- <v-dialog v-model="projectsDialog" fullscreen transition="dialog-bottom-transition" :overlay=false scrollable>
            <v-card>
                <v-toolbar style="flex: 0 0 auto;" dark class="info">
                    <v-btn icon @click.native="projectsDialog = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Projects</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="projectsDialog = false">Close</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-btn color="primary" dark @click.stop="dialog2 = !dialog2">
                        <v-icon left>add</v-icon>
                        Create new project
                    </v-btn>
                    <v-list three-line subheader>
                        <v-subheader>Group projects</v-subheader>
                        <v-list-tile avatar>
                            <v-list-tile-content>
                                <v-data-table
                                v-bind:headers="projectsHeaders"
                                :items="projectsItems"
                                hide-actions
                                class="elevation-1"
                                >
                                <template slot="items" slot-scope="props">
                                <td class="text-xs-left">{{ props.item.id }}</td>
                                <td class="text-xs-left">{{ props.item.dateCreated }}</td>
                                <td class="text-xs-left">{{ props.item.model }}</td>
                                <td class="text-xs-left">{{ props.item.comment }}</td>
                                <td class="text-xs-left">
                                  view docs

                                </td>
                                </template>
                            </v-data-table>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    </v-list>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog> -->
  <!-- End Projects Dialog -->
  <!-- Start Projects Dialog -->
  <!-- <v-dialog v-model="studentsDialog" fullscreen transition="dialog-bottom-transition" :overlay=false scrollable>
            <v-card>
                <v-toolbar style="flex: 0 0 auto;" dark class="info">
                    <v-btn icon @click.native="studentsDialog = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Students</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="studentsDialog = false">Close</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-btn color="primary" dark @click.stop="addStudentDialog = !addStudentDialog">Add new student</v-btn>
                    <v-list three-line subheader>
                        <v-subheader>Group students</v-subheader>
                        <v-list-tile avatar>
                            <v-list-tile-content>
                              <v-data-table
                                    v-bind:headers="studentsHeaders"
                                    :items="studentsItems"
                                    hide-actions
                                    class="elevation-1"
                                  >
                                  <template slot="items" slot-scope="props">

                                    <td class="text-xs-right">{{ props.item.id }}</td>
                                    <td class="text-xs-right">{{ props.item.firstName }}</td>
                                    <td class="text-xs-right">{{ props.item.lastName }}</td>
                                    <td class="text-xs-right">{{ props.item.email }}</td>
                                    <td class="text-xs-right">{{ props.item.phone }}</td>
                                    <td class="text-xs-right">{{ props.item.comment }}</td>

                                  </template>
                                </v-data-table>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog> -->
  <!-- fin student dialog -->
  <!-- start edit student dialog -->
  <v-dialog v-model="addStudentDialog" persistent max-width="500px">
    <v-btn fixed right bottom fab dark slot="activator" color="info">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">add Student</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="firstName" v-model="firstName"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="lastName" v-model="lastName"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="email" v-model="email"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="phone" v-model="phone"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="comment" v-model="studentComment" multi-line></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="emptyfields();addStudentDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="adddStudentToDb();addStudentDialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- end edit student dialog -->
  <!-- start edit student dialog -->
  <v-dialog v-model="editStudentDialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">edit Student</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="firstName" v-model="firstName"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="lastName" v-model="lastName"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="email" v-model="email"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="phone" v-model="phone"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="comment" v-model="studentComment" multi-line></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="emptyfields();editStudentDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="updateStudentInDb(idStudent);editStudentDialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- end edit student dialog -->
</div>
</template>

<script>
import navigation from './navigation-drawer'
var dateTime = require('node-datetime');
import axios from 'axios'
import Vue from 'vue';
window.Vue = Vue;

export default {
  components: {
    navigation
  },
  data: function() {
    return {
      // dialog: false,
      // projectsDialog: false,
      addStudentDialog: false,
      editStudentDialog: false,
      // name: '',
      // comment: '',
      // currentSession: '',
      currentGroup: '',
      idStudent: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      studentComment: '',
      students: [],

    }
  },
  beforeMount: function() {
    this.$session.has("group") ? console.log("group found") : this.$router.push('/');
    this.currentGroup = this.$session.get("group");
    console.log(this.currentGroup);
    axios.get('http://localhost:3000/students/' + this.currentGroup)
      .then(response => {

        console.log("trying to push data");
        response.data.forEach(element => {

          let obj = {
            id: element._id,
            firstName: element.firstName,
            lastName: element.lastName,
            email: element.email,
            phone: element.phone,
            comment: element.comment
          }
          this.students.push(obj);
          console.log("here");
          console.log(obj);
          //console.log(this.studentsItems);
        });
      })
      .catch(function(error) {
        console.log(error);

      });


    console.log("axios executed");
  },
  beforeCreate: function() {
    this.$session.start();

  },
  watch: {
    groups: function(val) {
      this.groups = this.groups;
    }
  },
  methods: {
    editStudent: function(idStudent) {
      console.log('student  id --> ' + idStudent);
      console.log(this.students);
      let obj = [];
      this.students.forEach(function(element) {
        console.log(element);
        console.log('element id --> ' + element.id);
        //his.firstName = "test";
        console.log("test");

        if (element.id == idStudent) {
          obj = {
            id: element.id,
            firstName: element.firstName,
            lastName: element.lastName,
            email: element.email,
            phone: element.phone,
            comment: element.comment
          }

        }
      });
      console.log(obj);
      this.idStudent = obj.id,
        this.firstName = obj.firstName;
      this.lastName = obj.lastName;
      this.email = obj.email;
      this.phone = obj.phone;
      this.studentComment = obj.comment;

    },
    updateStudentInDb: function(idStudent) {
      let dt = dateTime.create();
      let formattedDate = dt.format('Y-m-d');
      console.log("id student -->" + idStudent);

      let newStudent = ({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        comment: this.studentComment,
        idGroup: this.currentGroup
      });

      console.log(newStudent);

      this.deleteStudent(idStudent, 0, false);
      this.addStudent(newStudent);
      setTimeout(function() {
        location.reload();
      }, 500);
      console.log("student should be updated");
    },
    deleteStudent: function(id, index, doo) {
      console.log("in delete doo -->" + doo);
      if (doo) {
        console.log("in true");
        axios.delete('http://localhost:3000/students/delete', {
          data: {
            _id: id
          }
        })
        Vue.delete(this.students, index);
      } else {
        console.log("in false id-->" + id);
        axios.delete('http://localhost:3000/students/delete', {
          data: {
            _id: id
          }
        })
      }
    },
    adddStudentToDb: function() {

      let newStudent = ({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        comment: this.studentComment,
        idGroup: this.currentGroup
      });

      axios.post('http://localhost:3000/students', newStudent).then(
        function(response) {
          console.log(response);
        }
      ).catch(
        function(error) {
          console.log(error);
        }
      );

      setTimeout(function() {
        location.reload();
      }, 500);
    },
    addStudent: function(newobj) {
      axios.post('http://localhost:3000/students', newobj).then(
        function(response) {
          console.log(response);
        }
      ).catch(
        function(error) {
          console.log(error);
        }
      );
      // this.editDialog = true;

    },
    emptyfields: function() {

      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.phone = "";
      this.studentComment = "";

    }
  }
}
</script>

<style scoped>
.block {
  display: block
}

.btn-right {
  position: absolute;
  right: 25px;
  bottom: 25px
}
</style>
