// vi: ts=2 et

<script>
export default {
  props: {
    dialogVisible: Boolean,
    description: String,
  },
  emits: ['update:dialogVisible', 'update:description', 'onAddOrSave'],
  data() {
    return {
      descriptionRules: [
        (value) => {
          if (value?.length > 0) return true

          return 'You must enter a description!'
        },
      ],
      password: '',
      passwordRepeat: '',
      passwordRules: [
        () => {
          if (this.password == this.passwordRepeat) return true

          return 'Passwords must match!'
        },
      ],
    }
  },
  methods: {
    clear() {
      this.password = ''
      this.passwordRepeat = ''
    },
    async onSubmit(event) {
      let results = await event

      if (!results.valid) return

      this.$emit('onAddOrSave', {
        description: this.description,
        password: this.password,
      })

      this.clear()
    },
  },
}
</script>

<template>
  <v-dialog
    :model-value="dialogVisible"
    @update:model-value="(value) => $emit('update:dialogVisible', value)"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="primary" dark v-bind="activatorProps">Add/Edit password</v-btn>
    </template>
    <v-form validate-on="submit lazy" @submit.prevent="onSubmit">
      <v-card>
        <v-card-title>
          <span class="headline">Add/Edit Password</span>
        </v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-text-field
              label="Description*:"
              :rules="descriptionRules"
              :model-value="description"
              @input="$emit('update:description', $event.target.value)"
            >
            </v-text-field>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="password" label="Password*" @input="passwordRepeat = ''">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="passwordRepeat"
                label="Password repeat*"
                :rules="passwordRules"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn
            tabindex="1"
            color="blue darken-1"
            flat
            @click="$emit('update:dialogVisible', false)"
            >Abort</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn tabindex="0" color="blue darken-1" flat type="submit">Add/Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
