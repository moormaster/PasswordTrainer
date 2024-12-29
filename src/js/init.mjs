// vi: ts=2 et

import { createApp, computed } from 'vue'
import { App } from './app/App.mjs'
import VueApp from '../App.vue'

import PagePasswordTrainer from '../components/PagePasswordTrainer.vue'
import PageManagePasswords from '../components/PageManagePasswords.vue'
import PageImportExport from '../components/PageImportExport.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

let app = new App()
app.readFromLocalStorage()

let vueApp = createApp(VueApp)
  .use(vuetify)
  .component('PagePasswordTrainer', PagePasswordTrainer)
  .component('PageManagePasswords', PageManagePasswords)
  .component('PageImportExport', PageImportExport)
  .provide(
    'appInstance',
    computed(() => app),
  )

vueApp.config.unwrapInjectedRef = true // enables computed provide-props - remove when using vue >= 3.3
vueApp.mount('#app')
