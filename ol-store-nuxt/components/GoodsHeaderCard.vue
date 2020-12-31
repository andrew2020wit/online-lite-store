<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>${{ price }}: {{ name }}</v-card-title>

    <v-card-actions>
      <v-btn color="primary" text @click="buy"> Buy </v-btn> <v-spacer />
      <v-btn color="primary" text :to="`/goods/` + goodsId"> Details </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    goodsId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, default: null },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    buy() {},
  },
});
</script>
