<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <h3>Order</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  mounted() {
    this.$store.commit('cart/showCart');
  },
});
</script>
