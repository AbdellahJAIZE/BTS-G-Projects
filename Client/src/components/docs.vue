<template>
<div>
  <navigation title="Documents"></navigation>
  <v-container>
    <v-layout row wrap class="mb-3" v-for="(doc, index) in documents" :key="index">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info" color="cyan darken-2">
          <v-container fluid>
            <v-layout row>
              <v-flex>
                <v-card-title class="pb-0" primary-title>
                  <div>
                    <h5 class="white--text">{{doc.name}}</h5>
                    <span class="white--text block">dateUploaded: {{doc.dateCreated}}</span>
                  </div>
                </v-card-title>
                <v-card-actions class="pt-0">
                  <v-spacer></v-spacer>
                  <v-btn v-on:click.stop="deletedoc(doc.id,index,true) " color="error">
                    <v-icon left>delete</v-icon>
                    Delete
                  </v-btn>
                  <v-btn v-on:click.stop="editdoc(doc.id); editDocDialog = true " color="info">
                    <v-icon left>edit</v-icon>
                    edit
                  </v-btn>
                  <v-btn color="success" v-on:click="">
                    <v-icon>cloud_download </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

  <v-dialog v-model="addDocDialog" persistent max-width="500px">
    <v-btn fixed right bottom fab dark slot="activator" color="info">
      <v-icon dark>cloud_upload</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">add Document</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="name" v-model="name"></v-text-field>
            </v-flex>
            <div>
              <v-text-field prepend-icon="attach_file" single-line v-model="filename" :label="label" :required="required" @click.native="onFocus" :disabled="disabled" ref="fileTextField"></v-text-field>
              <input type="file" :accept="accept" :multiple="false" :disabled="disabled" ref="fileInput" @change="onFileChange">
            </div>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="emptyfields();addDocDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="adddocToDb();addDocDialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- end edit student dialog -->
  <!-- start edit student dialog -->
  <v-dialog v-model="editDocDialog" persistent max-width="500px">
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
        <v-btn color="blue darken-1" flat @click.native="emptyfields();editDocDialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="updateDocInDb(idDoc);editDocDialog = false">Save</v-btn>
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
  props: {
    value: {
      type: [Array, String]
    },
    accept: {
      type: String,
      default: "*"
    },
    label: {
      type: String,
      default: "Please choose..."
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean, // not yet possible because of data
      default: false
    }
  },
  data: function() {
    return {
      addDocDialog: false,
      editDocDialog: false,
      currentGroup: '',
      idDoc: '',
      name: '',
      model: '',
      dateCreated: '',
      comment: '',
      documents: [{
          id: "dmsjhmklqdjlk",
          name: "doc1",
          path: "dsds/sdsd",
          dateCreated: "2017/12/03"
        },
        {
          id: "dmsjhmklqdjlk",
          name: "doc1",
          path: "dsds/sdsd",
          dateCreated: "2017/12/03"
        },
        {
          id: "dmsjhmklqdjlk",
          name: "doc1",
          path: "dsds/sdsd",
          dateCreated: "2017/12/03"
        }
      ],

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
    getFormData(files) {
      const data = new FormData();
      [...files].forEach(file => {
        data.append('data', file, file.name); // currently only one file at a time
      });
      return data;
    },
    onFocus() {
      if (!this.disabled) {
        debugger;
        this.$refs.fileInput.click();
      }
    },
    onFileChange($event) {
      const files = $event.target.files || $event.dataTransfer.files;
      const form = this.getFormData(files);
      if (files) {
        if (files.length > 0) {
          this.filename = [...files].map(file => file.name).join(', ');
        } else {
          this.filename = null;
        }
      } else {
        this.filename = $event.target.value.split('\\').pop();
      }
      this.$emit('input', this.filename);
      this.$emit('formData', form);
    },
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

input[type=file] {
  position: absolute;
  left: -99999px;
}
</style>
