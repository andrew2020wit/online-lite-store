<template>
  <v-card :loading="loading" height="300" :to="`/goods/` + goodsId">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="200" :src="imgSrc1"></v-img>

    <v-card-title>
      <div class="block1">${{ price }}: {{ name }}</div></v-card-title
    >
  </v-card>
</template>

<style scoped>
.block1 {
  height: 4rem;
  overflow: hidden;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { goodsImagesDir, srcSmallWithoutPhoto } from '~/data/const';
export default Vue.extend({
  props: {
    goodsId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, default: null },
    imgSrc: { type: String, default: null },
  },
  computed: {
    imgSrc1() {
      if (!this.imgSrc) {
        return srcSmallWithoutPhoto;
      }
      return goodsImagesDir + this.goodsId + '/' + this.imgSrc;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
});
</script>
