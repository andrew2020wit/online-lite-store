<template>
  <div>
    <h1>{{ goods.name }}</h1>
    <v-container>
      <v-row
        ><v-col cols="12" xl="2" lg="3" md="4" sm="6">
          <v-img height="200" :src="imgSrc"></v-img> </v-col
        ><v-col cols="12" xl="2" lg="3" md="4" sm="6"
          ><BuyItemWidget
            :goodsId="goods.slug"
            :name="goods.name"
            :price="goods.price" /></v-col
        ><v-col cols="12" xl="2" lg="3" md="4" sm="6"
          >Category: <strong> {{ goods.category }} </strong>
        </v-col></v-row
      >
      <v-row><nuxt-content :document="goods" /></v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { goodsImagesDir, srcSmallWithoutPhoto } from '~/data/const';
export default Vue.extend({
  components: {},
  async asyncData({ $content, params }) {
    const goods: any = await $content('goods', params.slug).fetch();
    //console.log('goods', goods);

    let images = [];

    let imgSrc = srcSmallWithoutPhoto;

    if (goods?.images) {
      images = goods.images;
      imgSrc = goodsImagesDir + params.slug + '/' + images[0];
    }

    return { goods, images, imgSrc };
  },
  data() {
    return {};
  },
});
</script>
