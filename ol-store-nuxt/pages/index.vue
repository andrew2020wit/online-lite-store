<template>
  <div>
    <h1>HomePage: shopwindow</h1>

    <v-container>
      <v-row dense>
        <v-col
          v-for="goods1 in goodsExt"
          :key="goods1.id"
          cols="12"
          xl="2"
          lg="3"
          md="4"
          sm="6"
        >
          <GoodsHeaderCard
            :name="goods1.name"
            :goodsId="goods1.id"
            :price="goods1.price"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { priceData } from '~/data/price';
import { GoodsExt } from '~/data/price.class';
import { countOfFirstFetchGoods } from '~/data/const';
export default Vue.extend({
  components: {},
  async asyncData({ $content }) {
    const goodsContent = await $content('goods')
      .only(['name', 'price', 'slug'])
      .where({ isActive: true })
      .sortBy('priority', 'desc')
      .limit(countOfFirstFetchGoods)
      .fetch();
    // console.log('goods', goods)
    const goodsExt: GoodsExt[] = [];

    goodsContent.forEach((goods1: any) => {
      const newGoodsExt1: GoodsExt = {
        id: goods1.slug,
        name: goods1.name,
        price: goods1.price,
      };

      const priceObj = priceData.find((value) => {
        return goods1.slug == value.id;
      });

      if (priceObj?.price) {
        newGoodsExt1.price = priceObj.price;
      }

      goodsExt.push(newGoodsExt1);
    });

    return { goodsExt };
  },
  data() {
    return {};
  },
});
</script>
