<template>
<div>
  <!-- <meta http-equiv="refresh" content="3"> -->
  <navigation title="Sessions"></navigation>
  <v-container>
    <v-layout row wrap class="mb-3" v-for="(session, index) in sessions" :key="index">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card color="grey lighten-3" flat>
          <v-container fluid>
            <v-layout row>
              <v-flex>
                <v-card-title>
                  <div>
                    <h5>Session: {{toSessionYear(session.sessionYear)}}</h5>
                    <!-- <span class="block">Groups: {{session.groups}}</span> -->
                    <!-- <span class="block">Projects: {{session.projects}}</span> -->
                    <!-- <span class="block">Last visited: {{session.dateLastVisited}}</span> -->
                    <span class="block">Date created: {{session.dateCreated}}</span>
                    <span class="block">comment: {{session.comment}}</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn :disabled="session._id === sessionID" v-on:click="switchTo(session)" color="success">
                    <v-icon left>call_missed_outgoing</v-icon>
                    Switch
                  </v-btn>
                  <v-btn v-on:click.stop="editSession(session._id);editDialog = true" dark color="blue-grey">
                    <v-icon left>edit</v-icon>
                    Edit
                  </v-btn>
                  <v-btn v-on:click.stop="confirmDialog = true; toDelete = session._id; indexToDeleteFromVue = index" color="error">
                    <v-icon left>delete</v-icon>
                    Delete
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
  <v-dialog v-model="editDialog" persistent max-width="500px">

    <v-card>
      <v-card-title>
        <span class="headline">edit Session</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <span>Year: <b>{{sessionYear}}</b></span>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="comment" v-model="comment" multi-line></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="editDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="updateSessionInDb(idSession);editDialog = false">edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- End Dialog -->
  <!-- Start Edit Dialog -->
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-btn fixed right bottom fab dark slot="activator" color="info">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">create Session</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <span>Curent Session: <b>{{sessionYear}}</b></span>
              <v-text-field label="Year ex: 2019" v-model="newSessionYear"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="comment" v-model="comment" multi-line></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="sendToDb();dialog = false;editDialog=false;">Creat Session</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- End Edit Dialog -->
  <!-- Start Confirm Dialog -->
  <v-dialog v-model="confirmDialog">
    <v-card>
      <v-card-title class="headline">Confirmation</v-card-title>
      <v-card-text>Are you sure want to delete this session ?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click.native="confirmDialog = false">No</v-btn>
        <v-btn color="green darken-1" flat="flat" @click.native="deleteSession(toDelete,indexToDeleteFromVue,true);confirmDialog = false;">yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- End Confirm Dialog -->
  <v-snackbar timeout="3000" color="success" v-model="snackbar">
    {{snackbarText}}
    <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
  </v-snackbar>

</div>
</template>

<script>
import navigation from './navigation-drawer'
import axios from 'axios'
//datetime
var dateTime = require('node-datetime');

import Vue from 'vue';
window.Vue = Vue;


export default {
  components: {
    navigation
  },
  data: function() {
    return {
      dialog: false,
      editDialog: false,
      confirmDialog: false,
      toDelete: "",
      indexToDeleteFromVue: "",
      snackbar: false,
      snackbarText: "",
      sessionID: "",
      idSession: '',
      sessionYear: '',
      dateCreated: '',
      comment: "",
      mafhamtch: '',
      newSessionYear: (new Date()).getFullYear(),
      sessions: [
        //  {_id: "1", sessionYear: 2017, groups: 7, projects: 5, dateLastVisited: "3 Days", dateCreated: "2017/12/03"}
      ]
    }
  },
  watch: {
    sessions: function(val) {
      this.sessions = this.sessions;
    }
  },
  methods: {
    toSessionYear: function(year) {
      return year + '/' + (year + 1);
    },
    switchTo: function(session) {
      this.sessionID = session._id;
      this.snackbarText = "Switched to session: " + this.toSessionYear(session.sessionYear);
      this.snackbar = true;
      this.$session.set("session", session._id)
      //console.log("session -->  "+session.sessionYear);
      console.log("session is --> " + this.$session.get("session"));
    },
    updateShit: function() {
      //db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'MongoDB'}})

    },
    updateSessionInDb: function(idSession) {

      console.log("id session -->" + idSession);

      let newSession = ({
        _id: this.idSession,
        sessionYear: this.sessionYear,
        comment: this.comment,
        dateCreated: this.dateCreated,

      });

      console.log(newSession);
      console.log("--------------->" + idSession);
      this.deleteSession(idSession, 0, false);
      this.addSession(newSession);

      setTimeout(function() {
        location.reload();
      }, 400);
      console.log("project should be updated");
    },
    addSession: function(newobj) {
      axios.post('http://localhost:3000/sessions', newobj).then(
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
    deleteSession: function(id, index, doo) {
      console.log("in delete doo -->" + doo);
      console.log("id -->" + id);
      if (doo) {
        console.log("id -->" + id);
        // this.toDelete = "hhhh"
        console.log("index -->" + index);
        // axios.delete('http://localhost:3000/sessions/5a2eec53db950f0d385c75be');
        axios.delete('http://localhost:3000/sessions/delete', {
          data: {
            _id: id
          }
        })
        Vue.delete(this.sessions, index);
      } else {
        console.log("in false id-->" + id);
        axios.delete('http://localhost:3000/sessions/delete', {
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
    editSession: function(idSession) {
      console.log('session  id --> ' + idSession);

      let obj = [];
      this.sessions.forEach(function(element) {
        console.log(element);
        console.log('element id --> ' + element._id);
        console.log("test");

        if (element._id == idSession) {
          obj = {
            id: element._id,
            sessionYear: element.sessionYear,
            comment: element.comment,
            dateCreated: element.dateCreated
          }

        }
      });
      console.log(obj);
      this.idSession = obj.id,
        this.sessionYear = obj.sessionYear;
      this.comment = obj.comment;
      this.dateCreated = obj.dateCreated;

    },
    sendToDb: function() {
      //todays date
      let dt = dateTime.create();
      let formattedDate = dt.format('Y-m-d');
      //session schema
      console.log(this.newSessionYear);
      let newSession = {
        sessionYear: this.newSessionYear,
        dateLastVisited: Date,
        dateCreated: formattedDate,
        comment: this.comment
      };
      //to delete
      console.log(newSession);
      //posting data via axios to http://localhost:3000/sessions
      axios.post('http://localhost:3000/sessions', newSession).then(
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
      this.editDialog = true;
      setTimeout(function() {
        location.reload();
      }, 500);
      console.log("data sent to db");

    },
    refrech: function() {

    }
  },
  mounted: function() {
    // console.log("from mounted");
    // console.log(this.sessions["__ob__"]);
    // let x = this.sessions["__ob__"];
    // x.forEach(function(element) {
    //   console.log(element);
    // });

  },
  beforeMount: function() {
    this.$session.has("user") ? console.log("session found") : this.$router.push('/login');

  },
  beforeCreate: function() {
    this.$session.start();

  },
  created: function() {
    this.sessionID = this.$session.get("session");

    console.log("getting data");
    axios.get('http://localhost:3000/sessions')
      .then(response => {
        console.log("trying to push data");
        response.data.forEach(element => {

          let str1 = element.dateCreated;

          var str = str1.split("T");

          let obj = {
            _id: element._id,
            sessionYear: element.sessionYear,
            groups: 5,
            projects: 1,
            dateLastVisited: element.dateLastVisited,
            dateCreated: str[0],
            comment: element.comment
          }
          this.sessions.push(obj);
          console.log("here");
          console.log(obj);
          console.log(this.sessions[0]);
        });
      })
      .catch(function(error) {
        console.log(error);

      });

    console.log("axios executed");
    let set = false;
    if (this.$session.has("session")) {
      // console.log("session found");
      // this.switchTo(this.$session.get("session"))
      set = true;
    } else {
      set = false;
      // console.log("no selected session found");
      // console.log("sellecting first in the list");
      // console.log(this.sessions["0"]);
      // console.log(this.sessions[0]);
      // this.switchTo(this.sessions[0].sessionYear);

    }

    // this.setSelectedSession(set)


  },
  computed: {
    sessionYear: function() {
      var year = new Date().getFullYear();
      return year + "/" + (year + 1);
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
