// vi: ts=2 et

<script>
import { JSONFormatter } from '../js/util/json/JSONFormatter.mjs'

export default {
  data() {
    return {
      json: null,
      download: {
        url: null,
        filename: 'PasswordTrainer.json',
      },
      uploadedFile: null,
    }
  },
  inject: ['appInstance'],
  methods: {
    getExportJson() {
      let json = this.appInstance.exportJSON()
      let formatter = new JSONFormatter()
      return formatter.format(json)
    },

    onExportClicked() {
      this.json = this.getExportJson()
      this.download.url = URL.createObjectURL(
        new Blob([this.json], { type: 'application/octet-stream' }),
      )
    },

    async onFileUploaded() {
      this.json = await this.uploadedFile.text()
    },

    onImportClicked() {
      if (this.appInstance.importJSON(this.json)) this.$emit('importSuccess')
    },
  },
}
</script>

<template>
  <div data-role="header" data-position="fixed" :style="{ margin: '16px' }">
    <h1>Import/Export</h1>
  </div>

  <div data-role="content" :style="{ margin: '16px' }">
    <div>
      <v-btn @click="onExportClicked" color="primary">Export</v-btn>
      <a
        v-if="download.url"
        :href="download.url"
        :download="download.filename"
        style="margin-left: 40px"
        >{{ download.filename }}</a
      >
    </div>
    <div>
      <v-file-input
        label="Upload file"
        accept=".json"
        v-model="uploadedFile"
        @update:modelValue="onFileUploaded"
      >
        <template v-slot:prepend>
          <v-btn :disabled="!json" @click="onImportClicked" color="primary">Import</v-btn>
        </template>
      </v-file-input>
    </div>
    <v-textarea v-model="json" max-rows="15" auto-grow> </v-textarea>
  </div>
</template>
