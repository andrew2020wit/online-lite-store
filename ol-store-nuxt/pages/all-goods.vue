<template>
  <v-container>
    <table>
      <tr v-for="goods1 in goodsExt" :key="goods1.id">
        <td>
          <nuxt-link :to="`/goods/` + goods1.id"> {{ goods1.name }}</nuxt-link>
        </td>
        <td>${{ goods1.price }}</td>
      </tr>
    </table>
  </v-container>
</template>

<style scoped>
table,
td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 0.3rem;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { GoodsExt } from '~/data/price.class';
export default Vue.extend({
  components: {},
  async asyncData({ $content }) {
    const goodsContent = await $content('goods')
      .only(['name', 'price', 'slug'])
      .where({ isActive: true })
      .sortBy('name', 'asc')
      .fetch();
    // console.log('goods', goods)
    const goodsExt: GoodsExt[] = [];

    goodsContent.forEach((goods1: any) => {
      const newGoodsExt1: GoodsExt = {
        id: goods1.slug,
        name: goods1.name,
        price: goods1.price,
      };

      goodsExt.push(newGoodsExt1);
    });

    return { goodsExt };
  },
  data() {
    return {};
  },
});
</script>
