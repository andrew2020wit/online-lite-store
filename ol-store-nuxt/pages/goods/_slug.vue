<template>
  <v-container>
    <h1>{{ goods.name }}</h1>
    <p>Price: ${{ goods.price }}</p>
    <nuxt-content :document="goods" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { priceData } from '~/data/price';
import { GoodsExt } from '~/data/price.class';
export default Vue.extend({
  components: {},
  async asyncData({ $content, params }) {
    const goods = await $content('goods', params.slug).fetch();
    return { goods };
  },
  data() {
    return {};
  },
});
</script>
