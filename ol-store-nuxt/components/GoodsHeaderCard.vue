<template>
  <v-card :loading="loading" height="20rem" :to="`/goods/` + goodsId">
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

    <v-card-title>${{ price }}: {{ shortName }}</v-card-title>
  </v-card>
</template>

<style scoped></style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    goodsId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, default: null },
  },
  computed: {
    shortName() {
      const maxLength = 35;
      if ((this.name as string).length > maxLength) {
        return this.name.slice(0, maxLength) + '...';
      } else {
        return this.name;
      }
    },
  },
  data() {
    return {
      loading: false,
    };
  },
});
</script>
