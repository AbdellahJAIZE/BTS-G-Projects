<template>
<div>
  <navigation title="Notes"></navigation>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="(note, index) in notes" :key="index">
        <v-card color="ml-4 mb-4">
          <v-card-title v-bind:style="{ background: `rgba(${note.red}, ${note.green}, ${note.blue}, ${note.alpha})` }" class="white--text">
            <div class="headline">{{note.title}}</div>
          </v-card-title>
          <v-card-text class="note-content">
            <div class="pt-2 pb-2 pl-2 pr-2">{{note.content}}</div>
          </v-card-text>
          <v-card-actions v-bind:style="{ background: `rgba(${note.red}, ${note.green}, ${note.blue}, ${note.alpha})` }" class="white--text" primary-title>
            <v-icon class="ml-3" dark>date_range</v-icon> {{note.dateCreated}}
            <v-spacer></v-spacer>

            <v-icon v-on:click.stop="confirmDialog = true ; toDelete = note._id ; indexToDeleteFromVue = index" style="cursor: pointer" class="ml-3 mr-3" dark>delete</v-icon>
          </v-card-actions>
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
      <v-card-title v-bind:style="{ background: `rgba(${red}, ${green}, ${blue}, ${alpha})` }">
        <span class="headline white--text">Greate Note</span>
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn v-on:click.stop="colorDialog = true" slot="activator" fab small v-bind:style="{ background: `rgba(${red}, ${green}, ${blue}, ${alpha})` }"></v-btn>
          <span>Color</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>

            <v-flex xs12>
              <v-text-field label="Title" v-model="title" required></v-text-field>
              <v-text-field label="Content" v-model="content" multi-line required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="creatNote();dialog = false ">Create note</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- End Dialog -->
  <!-- Start Edit Dialog -->
  <v-dialog v-if="editDialog" v-model="editDialog" persistent max-width="500px">
    <v-card>
      <v-card-title v-bind:style="{ background: `rgba(${red}, ${green}, ${blue}, ${alpha})` }">
        <span class="headline white--text">Edit Note</span>
        <v-spacer></v-spacer>
        <v-tooltip left>
          <v-btn v-on:click.stop="colorDialog = true" slot="activator" fab small v-bind:style="{ background: `rgba(${red}, ${green}, ${blue}, ${alpha})` }"></v-btn>
          <span>Color</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Title" v-model="title" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Content" v-model="content" multi-line required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="editDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="updateNote(toDelete);editDialog = false ">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- End Edit Dialog -->
  <!-- Start Confirm Dialog -->
  <v-dialog v-model="confirmDialog">
    <v-card>
      <v-card-title class="headline">Confirmation</v-card-title>
      <v-card-text>Are you sure want to delete this note ?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click.native="confirmDialog = false">No</v-btn>
        <v-btn color="green darken-1" flat="flat" @click.native="confirmDialog = false ; deleteNote(toDelete) ">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- End Confirm Dialog -->
  <!-- Start Color Dialog -->
  <v-dialog v-model="colorDialog">
    <v-card class="e4">
      <v-card-media height="200px" v-bind:style="{ background: `rgba(${red}, ${green}, ${blue}, ${alpha})` }"></v-card-media>
      <v-card-text>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs9>
              <v-slider label="R" v-bind:max="255" v-model="red"></v-slider>
            </v-flex>
            <v-flex xs3>
              <v-text-field v-model="red" type="number"></v-text-field>
            </v-flex>
            <v-flex xs9>
              <v-slider label="G" v-bind:max="255" v-model="green"></v-slider>
            </v-flex>
            <v-flex xs3>
              <v-text-field v-model="green" type="number"></v-text-field>
            </v-flex>
            <v-flex xs9>
              <v-slider label="B" v-bind:max="255" v-model="blue"></v-slider>
            </v-flex>
            <v-flex xs3>
              <v-text-field v-model="blue" type="number"></v-text-field>
            </v-flex>
            <v-flex xs9>
              <v-slider label="A" v-bind:max="1" step="0.1" snap v-model="alpha"></v-slider>
            </v-flex>
            <v-flex xs3>
              <v-text-field v-model="alpha" type="number"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="colorDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- End Color Dialog -->
</div>
</template>

<script>
import navigation from './navigation-drawer'
import axios from 'axios'
var dateTime = require('node-datetime');
export default {
  components: {
    navigation
  },
  data: function() {
    return {
      dialog: false,
      editDialog: false,
      confirmDialog: false,
      colorDialog: false,
      indexToDeleteFromVue: "",
      toDelete: "",
      note: {},
      title: "",
      content: "",
      red: 33,
      green: 150,
      blue: 243,
      alpha: 0.5,
      notes: [
        //  { title: "First note title", content: "lorum ipsum.", red: 33, green: 150, blue: 243, alpha: 1, dateCreated: "2017/10/11" },
        //  { title: "First note title", content: "lorum ipsum.lorum ipsum.", red: 33, green: 150, blue: 243, alpha: 1, dateCreated: "2017/10/11" }

      ]
    }
  },
  methods: {
    updateNote: function(id) {

      axios.delete('http://localhost:3000/deleteNote', {
        data: {
          _id: id
        }
      })

      let dt = dateTime.create();
      let formattedDate = dt.format('Y-m-d');

      let noteUpdated = {
        title: this.title,
        content: this.content,
        red: this.red,
        green: this.green,
        blue: this.blue,
        alpha: this.alpha,
        dateCreated: formattedDate
      }

      axios.post('http://localhost:3000/notes', noteUpdated).then(
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
      }, 200);


    },
    creatNote: function() {


      //todays date
      let dt = dateTime.create();
      let formattedDate = dt.format('Y-m-d');

      let note = {
        title: this.title,
        content: this.content,
        red: this.red,
        green: this.green,
        blue: this.blue,
        alpha: this.alpha,
        dateCreated: formattedDate
      }


      console.log(note);
      axios.post('http://localhost:3000/notes', note).then(
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
      }, 400);


    },
    deleteNote: function(id) {
      // axios.delete('http://localhost:3000/sessions/5a2eec53db950f0d385c75be');
      axios.delete('http://localhost:3000/notes/delete', {
        data: {
          _id: id
        }
      })
      Vue.delete(this.notes, this.indexToDeleteFromVue);
    }
  },
  beforeMount: function() {
    this.$session.has("user") ? console.log("session found") : this.$router.push('/login');
  },
  beforeCreate: function() {
    this.$session.start();

  },
  created: function() {

    console.log("getting data");
    axios.get('http://localhost:3000/notes')
      .then(response => {
        console.log("trying to push data");
        response.data.forEach(element => {
          let str1 = element.dateCreated;
          var str = str1.split("T");
          console.log(str);
          let obj = {
            _id: element._id,
            title: element.title,
            content: element.content,
            red: element.red,
            green: element.green,
            blue: element.blue,
            alpha: element.alpha,
            dateCreated: str[0],
          }


          this.notes.push(obj);


        });
      })
      .catch(function(error) {
        console.log(error);
      });

    console.log("axios executed");
  }
}
</script>

<style scoped>
.note-content {
  min-height: 200px;
  max-height: 200px
}
</style>
