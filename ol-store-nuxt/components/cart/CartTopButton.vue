<template>
  <div>
    <v-btn color="primary" :outlined="cartIsOpen" plain @click="showCart">
      <v-icon v-if="!sum">mdi-cart-outline</v-icon>
      <v-icon v-if="sum">mdi-cart</v-icon> Cart
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  methods: {
    showCart() {
      this.$store.commit('cart/showCart');
    },
  },
  computed: mapState('cart', ['cartIsOpen', 'sum', 'items']),
});
</script>
