<template>
  <span> {{ username }} </span>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  computed: {
    username() {
      return this.$auth.user;
    },
  },
  methods: {
    async logout() {
      console.log('logout');
      await this.$auth.logout();
    },
  },
});
</script>
