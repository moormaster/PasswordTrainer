// vi: ts=2 et

<script>
import PasswordInputComponent from './PasswordInputComponent.vue'

import { LeveledScoreFormatter } from '../js/app/ui/LeveledScoreFormatter.mjs'
import { LeveledScore } from '../js/app/model/LeveledScore.mjs'

export default {
  components: {
    PasswordInputComponent,
  },

  inject: ['appInstance'],

  data() {
    return {
      currentPasswordRegistrationKey: null,
      passwordInputValue: '',
      state: null, // "success" | "failure" | null
      // TODO: temporarily set this to "success" / "failure"
      //       to visualize password attempt

      intervalId: null,
      timebasedData: {
        availablePasswordRegistrations: [],
        message: '',
        isPasswordInputReadonly: true,
      },
    }
  },

  methods: {
    addPasswordAttempt(password) {
      if (!this.appInstance) return false

      return this.appInstance.addPasswordAttempt(this.currentPasswordRegistrationKey, password)
    },

    updateTimebasedValues() {
      this.updateAvailablePasswordRegistrations()
      this.updateIsPasswordInputReadonly()
      this.updateMessage()
    },

    updateAvailablePasswordRegistrations() {
      this.timebasedData.availablePasswordRegistrations.splice(0)

      let registrations = this.getPasswordRegistrations().getAll()
      for (let key in registrations) {
        let leveledScore = new LeveledScore(registrations[key].scoreData)

        // password registrations which are locked are not part of the selection choice
        // unless they are currently selected
        if (key != this.currentPasswordRegistrationKey && leveledScore.lockHoursLeft > 0) continue

        this.timebasedData.availablePasswordRegistrations.push(registrations[key])
      }
    },

    updateIsPasswordInputReadonly() {
      this.timebasedData.isPasswordInputReadonly = this.getCurrentLeveledScore().lockHoursLeft > 0
    },

    updateMessage() {
      let formatter = new LeveledScoreFormatter()
      let leveledScoreDisplay = formatter.formatLeveledScore(this.getCurrentLeveledScore())
      let statusDisplay = formatter.formatStatus(this.getCurrentLeveledScore())

      if (!statusDisplay) this.timebasedData.message = leveledScoreDisplay
      else this.timebasedData.message = leveledScoreDisplay + ' (' + statusDisplay + ')'
    },

    getCurrentLeveledScore() {
      let scoreData = this.getPasswordRegistrations().get(
        this.currentPasswordRegistrationKey,
      )?.scoreData

      return new LeveledScore(scoreData)
    },

    getPasswordRegistrations() {
      return this.appInstance.applicationModel.passwordRegistrations
    },

    onPasswordEntered(password) {
      if (!password?.length) return

      this.passwordInputValue = ''

      // TODO: How to implement auto update?
      // interruptInterval(this.pageInstance, 1000);
      let success = this.addPasswordAttempt(password)
      if (success) this.state = 'success'
      else this.state = 'failure'
      this.updateTimebasedValues()

      window.setTimeout(() => {
        this.state = null
        this.setMostRecentPasswordRegistration()
        this.updateTimebasedValues()
      }, 1000)
    },

    setMostRecentPasswordRegistration() {
      this.currentPasswordRegistrationKey =
        this.appInstance.getMostRecentPasswordRegistration()?.description
    },
  },

  mounted() {
    this.intervalId = window.setInterval(() => {
      this.updateTimebasedValues()
      this.appInstance.passwordNotificator.notify()
    }, 1000)

    this.setMostRecentPasswordRegistration()
  },
}
</script>

<template>
  <div data-role="header" data-position="fixed">
    <h1>Train passwords</h1>
  </div>

  <div data-role="content">
    <div>
      <label for="select-password" class="select">Select password:</label>
      <v-select
        id="select-password"
        v-model="currentPasswordRegistrationKey"
        @update:modelValue="updateTimebasedValues"
        :items="timebasedData.availablePasswordRegistrations.map((it) => it.description)"
        variant="outlined"
      >
      </v-select>
    </div>

    <div id="passwordtrainer">
      <password-input-component
        :isReadonly="timebasedData.isPasswordInputReadonly"
        :description="currentPasswordRegistrationKey"
        :message="timebasedData.message"
        :state="state"
        v-model="passwordInputValue"
        @passwordEntered="onPasswordEntered"
      />
    </div>
  </div>
</template>
