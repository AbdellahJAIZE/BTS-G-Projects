<template>
<div>
  <navigation title="Projects"></navigation>
  <v-container>
    <v-layout row wrap class="mb-3" v-for="(project, index) in projects" :key="index">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info" color="cyan darken-2">
          <v-container fluid>
            <v-layout row>
              <v-flex>
                <v-card-title class="pb-0" primary-title>
                  <div>
                    <h5 class="white--text">{{project.name}}</h5>
                    <span class="white--text block">dateCreated: {{project.dateCreated}}</span>
                    <span class="white--text block">model: {{project.model}}</span>
                    <span class="white--text block">comment : {{project.comment}}</span>
                  </div>
                </v-card-title>
                <v-card-actions class="pt-0">
                  <v-spacer></v-spacer>
                  <v-btn v-on:click.stop="deleteProject(project.id,index,true) " color="error">
                    <v-icon left>delete</v-icon>
                    Delete
                  </v-btn>
                  <v-btn v-on:click.stop="editProject(project.id); editProjectDialog = true " color="info">
                    <v-icon left>edit</v-icon>
                    edit
                  </v-btn>
                  <v-btn color="brown lighten-2" v-on:click="redirectTo(project.id);">
                    <v-icon>arrow_forward</v-icon>
                    Docs
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

  <v-dialog v-model="addProjectDialog" persistent max-width="500px">
    <v-btn fixed right bottom fab dark slot="activator" color="info">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">add Project</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="name" v-model="name"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="model" v-model="model"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="comment" v-model="comment" multi-line></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="emptyfields();addProjectDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="adddProjectToDb();addProjectDialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- end edit student dialog -->
  <!-- start edit student dialog -->
  <v-dialog v-model="editProjectDialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">edit Project</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="name" v-model="name"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="model" v-model="model"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="comment" v-model="comment" multi-line></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="emptyfields();editProjectDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="updateProjectInDb(idProject);editProjectDialog = false">Save</v-btn>
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
      addProjectDialog: false,
      editProjectDialog: false,
      currentGroup: '',
      idProject: '',
      name: '',
      model: '',
      dateCreated: '',
      comment: '',
      projects: [],

    }
  },
  beforeMount: function() {
    this.$session.has("group") ? console.log("group found") : this.$router.push('/');
    this.currentGroup = this.$session.get("group");
    console.log(this.currentGroup);
    axios.get('http://localhost:3000/projects/' + this.currentGroup)
      .then(response => {

        console.log("trying to push data");
        response.data.forEach(element => {
          let str1 = element.dateCreated;
          var str = str1.split("T");

          let obj = {
            id: element._id,
            name: element.name,
            model: element.model,
            dateCreated: str[0],
            comment: element.comment,
            idGroup: element.idGroup
          }
          this.projects.push(obj);
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
    editProject: function(idProject) {
      console.log('project  id --> ' + idProject);

      let obj = [];
      this.projects.forEach(function(element) {
        console.log(element);
        console.log('element id --> ' + element.id);
        //his.firstName = "test";
        console.log("test");

        if (element.id == idProject) {
          obj = {
            id: element.id,
            name: element.name,
            model: element.model,
            comment: element.comment,
            dateCreated: element.dateCreated

          }

        }
      });
      console.log(obj);
      this.idProject = obj.id,
        this.name = obj.name;
      this.model = obj.model;
      this.comment = obj.comment;
      this.dateCreated = obj.dateCreated;

    },
    updateProjectInDb: function(idProject) {
      let dt = dateTime.create();
      let formattedDate = dt.format('Y-m-d');
      console.log("id Project -->" + idProject);

      let newProject = ({
        name: this.name,
        model: this.model,
        dateCreated: this.dateCreated,
        comment: this.comment,
        idGroup: this.currentGroup
      });

      console.log(newProject);

      this.deleteProject(idProject, 0, false);
      this.addProject(newProject);

      setTimeout(function() {
        location.reload();
      }, 500);
      console.log("project should be updated");
    },
    deleteProject: function(id, index, doo) {
      console.log("in delete doo -->" + doo);
      if (doo) {
        console.log("in true");
        axios.delete('http://localhost:3000/projects/delete', {
          data: {
            _id: id
          }
        })
        Vue.delete(this.projects, index);
      } else {
        console.log("in false id-->" + id);
        axios.delete('http://localhost:3000/projects/delete', {
          data: {
            _id: id
          }
        })
      }
    },
    adddProjectToDb: function() {
      let dt = dateTime.create();
      let formattedDate = dt.format('Y-m-d');

      //  { id : "sqdqsd", name : "jlkkljlksd", model : "encascade", dateCreated : "12/45/2254", comment : "kjzhlakjze" }
      let newStudent = ({
        name: this.name,
        model: this.model,
        dateCreated: formattedDate,
        comment: this.comment,
        idGroup: this.currentGroup
      });

      axios.post('http://localhost:3000/projects', newStudent).then(
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
    addProject: function(newobj) {
      axios.post('http://localhost:3000/projects', newobj).then(
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

    },
    redirectTo: function(id) {
      this.$session.set("project", id)
      this.$router.push('/docs')
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
