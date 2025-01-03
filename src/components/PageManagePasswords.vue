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

    async onDelete(description) {
      if (await this.confirm(`Delete ${description}?`))
        this.appInstance.deletePasswordRegistration(description)
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
      let registrations = this.appInstance.applicationModel.passwordRegistrations.getAll()

      if (this.editDialog.descriptionToEdit != newDescription && newDescription in registrations)
        if (!(await this.confirm(`Overwrite "${newDescription}"?`))) return

      if (!this.editDialog.descriptionToEdit) {
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
  <v-card
    :style="{ margin: '16px', maxWidth: '512px' }"
    variant="outlined"
    v-for="passwordRegistration in getPasswordRegistrations()"
    :key="passwordRegistration.description"
  >
    <v-card-title>{{ passwordRegistration.description }}</v-card-title>
    <v-card-subtitle
      >Score: {{ formatPasswordScore(passwordRegistration) }} Level:
      {{ formatPasswordLevel(passwordRegistration) }}</v-card-subtitle
    >

    <v-card-text
      :style="{
        backgroundColor: 'lightgrey',
        paddingTop: '3px',
        paddingBottom: '3px',
      }"
    >
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
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn icon="$edit" @click="onEdit(passwordRegistration.description)"></v-btn>
      <v-btn icon="$delete" @click="onDelete(passwordRegistration.description)"></v-btn>
    </v-card-actions>
  </v-card>
  <div :style="{ margin: '16px' }">
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
  </div>

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
