<template>
<div>
  <v-navigation-drawer temporary v-model="sideNav">
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="/static/images/LOGO.png" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>G-Projects</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile v-for="(item, index) in items" :key="index" :to="item.link">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="uppercase">{{item.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar>
    <v-toolbar-side-icon v-on:click="sideNav = !sideNav"></v-toolbar-side-icon>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-menu offset-y>
        <v-btn slot="activator" flat>
          <v-icon>person_pin</v-icon>
          {{user}}
        </v-btn>
        <v-list>

          <v-list-tile to="/logout">
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  data: function() {
    return {
      sideNav: false,
      user: '',
      items: [{
          title: "Home",
          icon: "home",
          link: "/"
        },
        {
          title: "Groups",
          icon: "group",
          link: "/groups"
        },
        {
          title: "Sessions",
          icon: "school",
          link: "/sessions"
        },
        {
          title: "Notes",
          icon: "note",
          link: "/notes"
        },
        {
          title: "About",
          icon: "code",
          link: "/about"
        }
      ],
      groups: [{
        name: ""
      }]
    }
  },
  beforeMount: function() {
    this.$session.has("user") ? this.user = this.$session.get("user") : console.log("no session found");
  }
}
</script>
