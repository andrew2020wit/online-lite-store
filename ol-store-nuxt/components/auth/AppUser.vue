<template>
  <span> <AppUserIn v-if="this.$auth.loggedIn" /> <AppUserOut v-else /> </span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    isLogged() {
      console.log('this.$auth.loggedIn', this.$auth.loggedIn)
      return this.$auth.loggedIn
    },
  },
})
</script>
