<template>
  <div><h1>Profile</h1></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getUserProfileEndPoint, putOrderEndPoint } from '~/data/const';
export default Vue.extend({
  mounted() {
    this.$store.commit('cart/showCart');
    this.$axios.$get(getUserProfileEndPoint).then((userProfile) => {
      console.log('userProfile', userProfile);
    });
  },
});
</script>
