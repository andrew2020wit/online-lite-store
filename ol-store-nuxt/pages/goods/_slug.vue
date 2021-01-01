<template>
  <div>
    <h1>{{ goods.name }}</h1>
    <v-container>
      <v-row
        ><v-col cols="12" xl="4" lg="4" md="6" sm="8"
          ><nuxt-content :document="goods" /></v-col
        ><v-col cols="12" xl="2" lg="2" md="2" sm="2"
          ><BuyItemWidget
            :goodsId="goods.slug"
            :name="goods.name"
            :price="goods.price" /></v-col
      ></v-row>
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
