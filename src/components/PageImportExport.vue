// vi: ts=2 et

<script>
import { JSONFormatter } from '../js/util/json/JSONFormatter.mjs'

export default {
  data() {
    return {
      json: '',
    }
  },
  inject: ['appInstance'],
  methods: {
    exportPasswordRegistrations() {
      let json = this.appInstance.exportJSON()
      let formatter = new JSONFormatter()
      this.json = formatter.format(json)
    },

    async importPasswordRegistrations(event) {
      this.appInstance.importJSON(event.target.value)
    },
  },

  mounted() {
    this.exportPasswordRegistrations()
  },

  beforeUpdate() {
    this.exportPasswordRegistrations()
  },
}
</script>

<template>
  <div data-role="header" data-position="fixed">
    <h1>Import/Export</h1>
  </div>

  <div data-role="content">
    <v-textarea :model-value="json" @blur="importPasswordRegistrations" max-rows="25" auto-grow>
    </v-textarea>
  </div>

  <div data-role="footer" data-position="fixed">
    <div data-role="navbar">
      <ul>
        <li><a href="#pageTrainPasswords">Train</a></li>
        <li><a href="#pageManagePasswords">Manage</a></li>
        <li>
          <a href="#pageImportExport" class="ui-btn-active ui-state-persist">Import/Export</a>
        </li>
      </ul>
    </div>
  </div>
</template>
