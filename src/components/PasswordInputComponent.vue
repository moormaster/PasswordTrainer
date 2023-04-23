// vi: ts=2 et

<script>
export default {
  data() {
    return {
      lastModelValue: '',
    }
  },

  props: {
    description: String,
    isReadonly: Boolean,
    message: String,
    modelValue: String,
    state: String, // "success" | "failure" | null
  },

  computed: {
    colorClass() {
      return {
        bg_anim_green: this.state == 'success',
        bg_anim_red: this.state == 'failure',
      }
    },
  },

  emits: ['passwordEntered'],

  methods: {
    emitPasswordEntered(value) {
      // emit vue3 event
      this.$emit('passwordEntered', value)
    },
  },

  mounted() {},

  updated() {
    this.lastModelValue = this.modelValue
  },
}
</script>

<template>
  <h2 class="passworddescription">{{ description }}</h2>
  <div>
    <v-text-field
      type="password"
      class="password"
      data-role="none"
      :disabled="isReadonly"
      :class="colorClass"
      :model-value="modelValue"
      @update:model-value="(v) => (lastModelValue = v)"
      @blur="emitPasswordEntered(lastModelValue)"
    /><br />
    <span class="passwordscore">{{ message }}</span>
  </div>
</template>

<style scoped>
.bg_anim_red {
  transition: all 1s ease-in-out;
  background-color: red;
}

.bg_anim_green {
  transition: all 1s ease-in-out;
  background-color: green;
}

.bg_anim_yellow {
  transition: all 1s ease-in-out;
  background-color: yellow;
}

.bg_readonly {
  transition: all 1s ease-in-out;
  background-color: grey;
}
</style>
