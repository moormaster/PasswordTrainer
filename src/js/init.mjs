// vi: ts=2 et

// import { createApp } from 'vue'
// import App from './App.vue'
//
// // Vuetify
// import 'vuetify/styles'
// import { createVuetify } 'vuetify'
//
// const vuetify = createVuetify()
//
// create(App).use(vuetify).mount('#app')

import { App } from './app/App.mjs'
;(function ($) {
  var app

  $(document).ready(function () {
    app = new App()
    app.init()
    app.readFromLocalStorage()
  })
})(jQuery)
