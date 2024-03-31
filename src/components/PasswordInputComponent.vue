// vi: ts=2 et

<script>
import mitt from 'mitt'

export default {
  data() {
    return {
      state: null, // "success" | "failure" | null
      description: '',
      isReadonly: false,
      status: '',
      value: '',
    }
  },

  emits: ['passwordEntered'],

  computed: {
    colorClass() {
      return {
        bg_anim_green: this.state == 'success',
        bg_anim_red: this.state == 'failure',
      }
    },
  },

  methods: {
    emitPasswordEntered(value) {
      // emit vue3 event
      this.$emit('passwordEntered', value)

      // emit event to this.emiter eventBus for pure js handlers
      // Note: make sure that only the root vue component has an eventBus
      this.emitter.emit('passwordEntered', value)
    },
  },

  mounted() {
    // mitt eventBus - move to parent vue component as soon as it is implemented
    this.emitter = mitt()
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
      v-model="value"
      @blur="emitPasswordEntered($data.value)"
    /><br />
    <span class="passwordscore">{{ status }}</span>
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
