wd<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-layout row>
                        <v-flex xs12 class="pt-4 pb-3 info white--text text-xs-center">
                            <h4>LOGIN</h4>
                        </v-flex>
                    </v-layout>
                    <v-card-text>
                        <v-container>
                            <form v-on:submit.prevent="validateBeforeSubmit">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="email"
                                            label="Enter your email"
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            prepend-icon="email"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="password"
                                            label="Enter your password"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            prepend-icon="vpn_key"
                                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => (e1 = !e1)"
                                            :type="e1 ? 'password' : 'text'"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <small>*indicates required field</small>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn large :disabled="loading" :loading="loading" type="submit" class="info right">
                                            Login
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
                                            <v-icon right>send</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
var dateTime = require('node-datetime');
export default {
  data: function() {
    return {
      email: "",
      password: "",
      e1: true,
      loading: false
    }
  },
  methods: {
    validateBeforeSubmit: function() {
      this.loading = true;
      var d = new Date();
      var minutes = d.getMinutes();
      var hours = d.getHours();
      let password;
      (minutes.toString().length == 1) ? password = hours + "0" + minutes: password = hours + "" + minutes;
      // console.log("password :"+password);
      ((this.email == "karim@karim.karim") && (this.password == password)) ? this.submitForm(): this.loading = false;
    },
    submitForm: function() {
      this.startSession();
    },
    startSession: function() {
      this.$session.start()
      this.$session.set("user", "Karim")
      this.$router.push('/')
    }
  },
  beforeMount: function() {
    this.$session.has("user") ? this.$router.push('/') : console.log("no session found");
  },
  beforeCreate: function() {
    this.$session.start();
  }
}
</script>
