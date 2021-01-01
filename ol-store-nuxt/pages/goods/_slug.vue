<template>
  <div>
    <h1>{{ goods.name }}</h1>
    <v-container>
      <v-row
        ><v-col cols="12" xl="2" lg="3" md="4" sm="6">
          <v-img
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img> </v-col
        ><v-col cols="12" xl="2" lg="3" md="4" sm="6"
          ><BuyItemWidget
            :goodsId="goods.slug"
            :name="goods.name"
            :price="goods.price" /></v-col
      ></v-row>
      <v-row><nuxt-content :document="goods" /></v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
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
