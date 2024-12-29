// vi: ts=2 et

<script>
export default {
  data() {
    return {
      currentTabKey: 'pageTrainPasswords',

      tabs: {
        pageTrainPasswords: { title: 'Train' },
        pageManagePasswords: { title: 'Manage' },
        pageImportExport: { title: 'Import/Export' },
      },
    }
  },
  methods: {
    onImportSuccess() {
      this.currentTabKey = 'pageTrainPasswords'
    },
  },
}
</script>

<template>
  <v-app>
    <v-layout full-height>
      <v-app-bar>
        <v-app-bar-title class="mx-auto" style="text-align: center"
          >Password Trainer{{
            currentTabKey in tabs ? `: ${tabs[currentTabKey].title}` : null
          }}</v-app-bar-title
        >
      </v-app-bar>

      <v-main>
        <v-window v-model="currentTabKey">
          <v-window-item value="pageTrainPasswords">
            <PagePasswordTrainer />
          </v-window-item>

          <v-window-item value="pageManagePasswords">
            <PageManagePasswords />
          </v-window-item>

          <v-window-item value="pageImportExport">
            <PageImportExport @importSuccess="onImportSuccess" />
          </v-window-item>
        </v-window>
      </v-main>

      <v-bottom-navigation v-model="currentTabKey" grow bg-color="primary">
        <v-btn
          v-for="(item, key) in tabs"
          :key="key"
          :value="key"
          :max-width="`${100 / Object.keys(tabs).length}%`"
          >{{ item.title }}</v-btn
        >
      </v-bottom-navigation>
    </v-layout>
  </v-app>
</template>
