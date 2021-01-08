<template>
  <div>
    <h1>{{ goods.name }}</h1>
    <v-container>
      <v-row>
        <v-col cols="12" xl="2" lg="3" md="4" sm="6">
          <v-img height="200" :src="imgSrc"></v-img>

          <v-dialog transition="dialog-top-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on">Fotos</v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="primary" dark>Fotos</v-toolbar>
                <v-card-text>
                  <v-carousel>
                    <v-carousel-item
                      v-for="image in images"
                      :key="image"
                      :src="goodsImagesDir + slug + '/' + image"
                    >
                    </v-carousel-item>
                  </v-carousel>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn color="primary" @click="dialog.value = false"
                    >Close</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>

        <v-col cols="12" xl="2" lg="3" md="4" sm="6"
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
    const slug = params.slug;
    return { goods, images, imgSrc, goodsImagesDir, slug };
  },
  data() {
    return {};
  },
});
</script>
