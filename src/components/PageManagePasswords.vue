// vi: ts=2 et

<script>
import { LeveledScore } from '../js/app/model/LeveledScore.mjs'
import { LeveledScoreFormatter } from '../js/app/ui/LeveledScoreFormatter.mjs'
import PasswordDialog from './PasswordDialog.vue'

export default {
  components: {
    PasswordDialog,
  },
  data() {
    return {
      dialogVisible: false,
      dialogDescription: '',
    }
  },
  inject: ['appInstance'],
  methods: {
    formatPasswordLevel(passwordRegistration) {
      return new LeveledScoreFormatter().formatLevel(
        new LeveledScore(passwordRegistration.scoreData),
      )
    },

    formatPasswordScore(passwordRegistration) {
      return new LeveledScoreFormatter().formatScore(
        new LeveledScore(passwordRegistration.scoreData),
      )
    },

    formatPasswordStatus(passwordRegistration) {
      return new LeveledScoreFormatter().formatStatus(
        new LeveledScore(passwordRegistration.scoreData),
      )
    },

    getLockHours(passwordRegistration) {
      return new LeveledScore(passwordRegistration.scoreData).lockHours
    },

    getLockHoursLeft(passwordRegistration) {
      return new LeveledScore(passwordRegistration.scoreData).lockHoursLeft
    },

    getPasswordRegistrations() {
      let passwordRegistrations = []

      let registrations = this.appInstance.applicationModel.passwordRegistrations.getAll()
      for (let key in registrations) passwordRegistrations.push(registrations[key])

      return passwordRegistrations
    },

    onAddOrSavePasswordRegistration(description, password) {
      this.appInstance.addPasswordRegistration(description, password)

      this.dialogVisible = false
      this.dialogDescription = ''
    },
  },
}
</script>

<template>
  <table class="passwordTable">
    <thead>
      <tr>
        <th>Description</th>
        <th>Score / Level</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      <tr
        class="password"
        v-for="passwordRegistration in getPasswordRegistrations()"
        :key="passwordRegistration.description"
      >
        <td class="passworddescription">{{ passwordRegistration.description }}</td>
        <td>
          <span class="passwordscore">{{ formatPasswordScore(passwordRegistration) }}</span> /
          <span class="passwordlevel">{{ formatPasswordLevel(passwordRegistration) }}</span>
        </td>
        <td style="background-color: lightgrey; padding-top: 3px; padding-bottom: 3px">
          <span
            class="passwordlockprogressbar passwordstatus"
            :style="{
              backgroundColor: 'white',
              display: 'block',
              whiteSpace: 'nowrap',
              width:
                100 *
                  (1 -
                    this.getLockHoursLeft(passwordRegistration) /
                      this.getLockHours(passwordRegistration)) +
                '%',
            }"
          >
            {{ formatPasswordStatus(passwordRegistration) }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>

  <passwordDialog
    v-model:dialogVisible="dialogVisible"
    v-model:description="dialogDescription"
    @onAddOrSave="
      (dialogData) => onAddOrSavePasswordRegistration(dialogData.description, dialogData.password)
    "
  >
  </passwordDialog>
</template>
