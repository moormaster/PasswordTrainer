// vi: ts=2 et

<script>
export default {
  data() {
    return {
      currentTabKey: 'pageTrainPasswords',

      // hack to refresh PageManagePasswords tab when it gets visited
      // even though the data it is showing is not reactive.
      renderCount: 0,

      tabs: {
        pageTrainPasswords: { title: 'Train' },
        pageManagePasswords: { title: 'Manage' },
        pageImportExport: { title: 'Import/Export' },
      },
    }
  },
  watch: {
    currentTabKey(newTabKey) {
      this.onNavigate(newTabKey)
    },
  },
  methods: {
    onImportSuccess() {
      this.currentTabKey = 'pageTrainPasswords'
    },
    onNavigate(tabKey) {
      // ensure that PageManagePassword contents refresh once
      // when switching to that tab
      if (tabKey == 'pageManagePasswords') this.renderCount++

      if (tabKey == 'pageTrainPasswords') {
        // ensure that the "next pending" password is selected
        // when returning to the PagePasswordTrainer tab
        this.$refs.pagePasswordTrainer.setMostRecentPasswordRegistration()
      }
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
            <PagePasswordTrainer ref="pagePasswordTrainer" />
          </v-window-item>

          <v-window-item value="pageManagePasswords">
            <PageManagePasswords :render-count="renderCount" />
          </v-window-item>

          <v-window-item value="pageImportExport">
            <PageImportExport @importSuccess="onImportSuccess" />
          </v-window-item>
        </v-window>
      </v-main>

      <v-bottom-navigation v-model="currentTabKey" grow bg-color="primary" mandatory>
        <v-btn
          v-for="(item, key) in tabs"
          :key="key"
          :value="key"
          :max-width="`${100 / Object.keys(tabs).length}%`"
        >
          {{ item.title }}
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-app>
</template>
