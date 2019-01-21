<template>
<div>
  <navigation title="Groups"></navigation>
  <v-container>
    <v-layout row wrap class="mb-3" v-for="(group, index) in groups" :key="index">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex>
                <v-card-title class="pb-0" primary-title>
                  <div>
                    <h5 class="white--text">{{group.name}}</h5>
                    <!-- <h5 class="whitetext">{{group.id}}</h5> -->
                    <!-- <span class="white--text block">Members: {{group.members}}</span>
                                            <span class="white--text block">Projects: {{group.projects}}</span> -->
                    <span class="white--text block">comment : {{group.comment}}</span>
                    <span class="white--text block">Date created: {{group.dateCreated}}</span>
                  </div>
                </v-card-title>
                <v-card-actions class="pt-0">
                  <v-spacer></v-spacer>
                  <v-btn v-on:click.stop="deleteGroup(group.id,index,true) " color="error">
                    <v-icon left>delete</v-icon>
                    Delete
                  </v-btn>
                  <v-btn v-on:click.stop="editGroup(group.id,index); editGroupDialog = true" color="info">
                    <v-icon left>edit</v-icon>
                    edit
                  </v-btn>
                  <v-btn color="deep-orange darken-1" v-on:click="redirectTo(group.id,true);">
                    <v-icon>arrow_forward</v-icon>
                    Students
                  </v-btn>
                  <v-btn color="lime accent-2" v-on:click="redirectTo(group.id,false);">
                    <!--true and false for redirection -->
                    <v-icon>arrow_forward</v-icon>
                    Projects
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
  <v-dialog v-model="dialog" persistent max-width="500px">
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
  </v-dialog>
  <!-- End add Dialog -->
  <!-- edit Dialog -->
  <v-dialog v-model="editGroupDialog" persistent max-width="500px">

    <v-card>
      <v-card-title>
        <span class="headline">edit Group</span>
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
        <v-btn color="blue darken-1" flat @click.native="emptyfields();editGroupDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="updateGroupInDb(idGroup); editGroupDialog = false">Edit group</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- End edit Dialog -->

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
      dialog: false,
      editGroupDialog: false,
      name: '',
      comment: '',
      dateCreated: '',
      currentSession: '',
      idGroup: '',
      groups: [],
    }
  },
  beforeMount: function() {
    this.$session.has("user") ? console.log("user found") : this.$router.push('/login');
    this.$session.has("session") ? console.log("session found") : this.$router.push('/sessions');
    this.currentSession = this.$session.get("session");

    axios.get('http://localhost:3000/groups/' + this.currentSession)
      .then(response => {

        console.log("trying to push data");
        response.data.forEach(element => {
          let str1 = element.dateCreated;
          var str = str1.split("T");
          var projectCount;
          // axios.get('http://localhost:3000/projects/'+element._id)
          // .then(response =>{
          //     projectCount = response.data.length;
          //     console.log(projectCount);
          //     return projectCount;
          // }).catch(err => {
          //     console.log(err);
          // });
          var StudentsCount;
          // axios.get('http://localhost:3000/students/'+element._id)
          // .then(response =>{
          //     StudentsCount = response.data.length;
          //     console.log(StudentsCount);
          //     return StudentsCount;
          // }).catch(err => {
          //     console.log(err);
          // });
          // console.log("here");

          // setTimeout(function() {
          // }, 4000);
          console.log("here2");
          console.log(StudentsCount + " " + projectCount);
          let obj = {
            id: element._id,
            name: element.name,
            members: StudentsCount,
            projects: projectCount,
            dateCreated: str[0],
            comment: element.comment
          }
          this.groups.push(obj);
          console.log("here");
          console.log(obj);
          console.log(this.groups[0]);
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
  created: function() {


  },
  watch: {
    groups: function(val) {
      this.groups = this.groups;
    }
  },
  methods: {
    updateGroupInDb: function(idGroup) {
      
      console.log("id Group -->" + idGroup);

      let newGroup = ({
        _id: this.idGroup,
        name: this.name,
        comment: this.comment,
        dateCreated: this.dateCreated,
        idSession: this.currentSession
      });

      console.log(newGroup);
      console.log("--------------->" + idGroup);
      this.deleteGroup(idGroup, 0, false);
      this.addGroup(newGroup);

      setTimeout(function() {
        location.reload();
      }, 400);
      console.log("project should be updated");
    },
    addGroup: function(newobj) {
      axios.post('http://localhost:3000/groups', newobj).then(
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
    deleteGroup: function(id, index, doo) {
      console.log("in delete doo -->" + doo);
      console.log("id -->" + id);
      if (doo) {
        console.log("id -->" + id);
        // this.toDelete = "hhhh"
        console.log("index -->" + index);
        // axios.delete('http://localhost:3000/sessions/5a2eec53db950f0d385c75be');
        axios.delete('http://localhost:3000/groups/delete', {
          data: {
            _id: id
          }
        })
        Vue.delete(this.groups, index);
      } else {
        console.log("in false id-->" + id);
        axios.delete('http://localhost:3000/groups/delete', {
          data: {
            _id: id
          }
        })
      }
    },
    emptyfields: function() {

      this.name = "";

      this.comment = "";

    },
    editGroup: function(idGroup) {
      console.log('group  id --> ' + idGroup);

      let obj = [];
      this.groups.forEach(function(element) {
        console.log(element);
        console.log('element id --> ' + element.id);
        console.log("test");

        if (element.id == idGroup) {
          obj = {
            id: element.id,
            name: element.name,
            dateCreated: element.dateCreated,
            comment: element.comment
          }

        }
      });
      console.log(obj);
      this.idGroup = obj.id,
        this.name = obj.name;
      this.dateCreated = obj.dateCreated;
      this.comment = obj.comment;

    },
    SendToDb: function() {
      let dt = dateTime.create();
      let formattedDate = dt.format('Y-m-d');
      //session schema
      console.log(this.currentSession);
      let newGroup = ({
        name: this.name,
        dateCreated: formattedDate,
        comment: this.comment,
        idSession: this.currentSession
      });
      //to delete
      console.log(newGroup);
      axios.post('http://localhost:3000/groups', newGroup).then(
        function(response) {
          //loging response
          console.log(response);
        }
      ).catch(
        function(error) {
          //loging error if catched
          console.log(error);
        }
      );

      setTimeout(function() {
        location.reload();
      }, 500);
      console.log("data sent to db");
    },
    redirectTo: function(id, too) {
      if (too) {
        this.$session.set("group", id)
        this.$router.push('/students')
      } else {
        this.$session.set("group", id)
        this.$router.push('/projects')
      }

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
