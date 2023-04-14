// vi: ts=2 et

<script>
export default {
  data() {
    return {
      color: null, // "success" | "failure" | null
      description: '',
      isReadonly: false,
      status: '',
    }
  },
}
</script>

<template>
  <h2 class="passworddescription">{{ description }}</h2>
  <div>
    <input type="password" class="password" data-role="none" :readonly="isReadonly" /><br />
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
