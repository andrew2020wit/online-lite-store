<template>
  <div>
    <v-text-field
      v-model="searchPattern"
      :rules="searchPatternRules"
      label="searchPattern"
    ></v-text-field>

    <v-container>
      <v-row dense>
        <v-col
          v-for="goods1 in goodsArr"
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
import { GoodsExt } from '~/data/price.class';

export default Vue.extend({
  data() {
    return {
      searchPattern: '',
      searchPatternRules: [
        (v: string) =>
          v.length > 2 || v.length == 0 || 'Must be more than 2 characters',
        (v: string) => v.length < 30 || 'Must be less than 30 characters',
      ],
      goodsArr: [] as GoodsExt[],
      goodsSkip: 0,
      takeGoods: 40,
      goodsFinished: false,
    };
  },

  methods: {
    async fetchGoods() {
      const goodsContent = await this.$content('goods')
        .only(['name', 'price', 'slug'])
        .where({ isActive: true })
        .sortBy('priority', 'desc')
        .limit(this.takeGoods)
        .fetch();

      goodsContent.forEach((goods1: any) => {
        const newGoodsExt1: GoodsExt = {
          id: goods1.slug,
          name: goods1.name,
          price: goods1.price,
        };
        this.goodsArr.push(newGoodsExt1);
      });
    },
  },
  mounted() {
    this.fetchGoods();
  },
});
</script>
