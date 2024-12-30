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
      confirmDialog: {
        title: '',
        text: '',

        isVisible: false,
        resolveFn: () => {},
      },

      editDialog: {
        isVisible: false,
        descriptionToEdit: null,
        newDescription: '',
      },
    }
  },
  inject: ['appInstance'],
  methods: {
    confirm(title, text) {
      this.confirmDialog.title = title
      this.confirmDialog.text = text

      this.confirmDialog.isVisible = true

      return new Promise((resolve) => {
        this.confirmDialog.resolveFn = resolve
      })
    },

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

    onEdit(description) {
      this.editDialog.descriptionToEdit = description
      this.editDialog.newDescription = description
      this.editDialog.isVisible = true
    },

    onEditDialogClose() {
      this.editDialog.descriptionToEdit = null
      this.editDialog.newDescription = ''
    },

    async onAddOrSavePasswordRegistration(newDescription, password) {
      if (!this.editDialog.descriptionToEdit) {
        // add
        let registrations = this.appInstance.applicationModel.passwordRegistrations.getAll()
        if (
          !(newDescription in registrations) ||
          (await this.confirm(`Overwrite "${newDescription}"?`))
        )
          this.appInstance.addPasswordRegistration(newDescription, password)
      } else {
        this.appInstance.updatePasswordRegistration(
          this.editDialog.descriptionToEdit,
          newDescription,
          password,
        )
      }

      this.editDialog.isVisible = false
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
        <th></th>
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
        <td style="padding-left: 16px">
          <v-btn icon="$edit" @click="onEdit(passwordRegistration.description)"></v-btn>
        </td>
      </tr>
    </tbody>
  </table>

  <passwordDialog
    v-model:dialogVisible="editDialog.isVisible"
    v-model:description="editDialog.newDescription"
    :mode="editDialog.descriptionToEdit == null ? 'add' : 'edit'"
    @after-leave="onEditDialogClose()"
    @onAddOrSave="
      (dialogData) => onAddOrSavePasswordRegistration(dialogData.description, dialogData.password)
    "
  >
  </passwordDialog>

  <v-dialog v-model="confirmDialog.isVisible">
    <v-card :title="confirmDialog.title" :text="confirmDialog.text">
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn
          @click="
            () => {
              confirmDialog.resolveFn(false)
              confirmDialog.isVisible = false
            }
          "
        >
          Abort
        </v-btn>

        <v-btn
          @click="
            () => {
              confirmDialog.resolveFn(true)
              confirmDialog.isVisible = false
            }
          "
        >
          Confirm
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
