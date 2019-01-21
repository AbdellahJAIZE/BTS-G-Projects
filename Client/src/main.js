import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'

import VeeValidate, {
  Validator
} from 'vee-validate'
import messages from 'vee-validate/dist/locale/fr'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'
import router from './router'

// Moment
var moment = require('moment')
import VueSession from 'vue-session'

//vue-Clip
import VueClip from 'vue-clip'

const shortDate = function(date) {
  return moment(date).format('DD/MM/YYYY')
}

const durationDate = function(date) {
  return moment.duration(Date.now() - new Date(date).getTime()).humanize()
}

const ISODateToString = function(date) {
  return moment(date).format("YYYY-MM-DD")
}

const realDateFormat = function() {
  return moment(new Date()).format('dddd, MMMM Do YYYY, h:mm:ss a')
}

Vue.filter('shortDate', shortDate)
Vue.filter('durationDate', durationDate)
Vue.filter('ISODateToString', ISODateToString)
Vue.filter('realDateFormat', realDateFormat)

// Config Validator
Validator.addLocale(messages)

const config = {
  locale: 'fr'
}

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate, config)
Vue.use(VueSession)
Vue.use(VueClip)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
