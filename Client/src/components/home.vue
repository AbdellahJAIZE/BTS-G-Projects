<template>
<div>
  <navigation title="Home"></navigation>
  <v-container>
    <v-layout class="mb-3 animated fadeInDown" row wrap>
      <v-flex class="hvr-grow" v-for="(item, index) in items" :key="index" xs12 sm6 md3>
        <v-card color="blue-grey--text darken-2 ml-2 mr-2">
          <v-container>
            <v-layout row>
              <v-flex xs5>
                <v-card-media class="pl-2 pt-2">
                  <v-icon style="border-radius: 50%" class="pt-2 pb-2 pl-2 pr-2 blue-grey darken-2" dark x-large>{{item.icon}}</v-icon>
                </v-card-media>
              </v-flex>
              <v-flex xs7>
                <div>
                  <div>
                    <h5 class="uppercase">{{item.name}}</h5>
                  </div>
                  <div>
                    <h6>{{item.value}}</h6>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="mb-3 animated fadeInDown" row wrap>
      <v-flex xs12>
        <v-parallax class="custom-border" src="/static/images/parallax.jpg" height="300">
          <v-icon dark x-large class="real-time-icon">update</v-icon>
          <h3 class="real-time text-xs-center">{{date}}</h3>
        </v-parallax>
      </v-flex>
    </v-layout>
    <v-layout class="mb-3 animated zoomIn" row wrap>
      <v-flex xs12>
        <div class="map">
          <div id="world-map-markers" style="height: 400px"></div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout class="animated fadeInDown" row wrap>
      <v-flex md12 lg4>
        <v-date-picker v-model="picker"></v-date-picker>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import navigation from './navigation-drawer';
var jvectormap = require('jvectormap');
import axios from 'axios'

export default {
  components: {
    navigation
  },
  data: function() {
    return {
      picker: Date.now(),
      date: null,
      items: []
    }
  },
  created: function() {
    var self = this;
    var update = function() {
      self.date = self.$options.filters.realDateFormat();
    };

    update();
    setInterval(update, 1000);
  },
  beforeMount: function() {
    this.$session.has("user") ? console.log("session found") : this.$router.push('/login');
  },
  mounted: function() {
    // Vector Map
    jQuery('#world-map-markers').vectorMap({
      map: 'world_mill_en',
      backgroundColor: '#fff',
      borderColor: '#818181',
      borderOpacity: 0.25,
      borderWidth: 1,
      color: '#f4f3f0',
      regionStyle: {
        initial: {
          fill: '#ddd'
        }
      },
      markerStyle: {
        initial: {
          r: 9,
          'fill': '#fff',
          'fill-opacity': 1,
          'stroke': '#000',
          'stroke-width': 5,
          'stroke-opacity': 0.4
        }
      },
      enableZoom: true,
      hoverColor: '#c9dfaf',
      markers: [{
        latLng: [32.9928605, -7.6546786],
        name: 'Settat'
      }],
      hoverOpacity: null,
      normalizeFunction: 'linear',
      scaleColors: ['#b6d6ff', '#005ace'],
      selectedColor: '#c9dfaf',
      selectedRegions: [],
      showTooltip: true,
      onRegionClick: function(element, code, region) {
        document.getElementsByClassName('jvectormap-zoomin')[0].click();
      }
    });
    document.getElementsByClassName('jvectormap-zoomin')[0].click();
  },
  created: function() {


    console.log("getting All Sessions");
    axios.get('http://localhost:3000/sessions')
      .then(response => {

        console.log(response.data.length);
        console.log(response.data.length);
        let obj = {
          name: "Sessions",
          icon: "school",
          value: response.data.length
        }
        this.items.push(obj);
      })
      .catch(function(error) {
        console.log(error);

      });

    console.log("getting All projects");
    axios.get('http://localhost:3000/projects')
      .then(response => {
        console.log(response.data.length);
        let obj = {
          name: "Projects",
          icon: "code",
          value: response.data.length
        }
        this.items.push(obj);
      })
      .catch(function(error) {
        console.log(error);

      });

    console.log("getting All Groups");
    axios.get('http://localhost:3000/groups')
      .then(response => {
        console.log(response.data.length);
        let obj = {
          name: "Groups",
          icon: "group",
          value: response.data.length
        }
        this.items.push(obj);

      })
      .catch(function(error) {
        console.log(error);

      });

    console.log("getting All notes");
    axios.get('http://localhost:3000/notes')
      .then(response => {
        console.log(response.data.length);
        let obj = {
          name: "Notes",
          icon: "note",
          value: response.data.length
        }
        this.items.push(obj);

      })
      .catch(function(error) {
        console.log(error);

      });
    console.log("axios executed");

  }
}
</script>

<style scoped>
.real-time {
  text-transform: capitalize
}

.custom-border {
  border-radius: 3px
}

.real-time-icon {
  position: absolute;
  top: 20px;
  left: 20px
}
</style>
