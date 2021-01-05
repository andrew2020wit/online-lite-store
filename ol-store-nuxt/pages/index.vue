<template>
  <div>
    <v-container>
      <v-row
        ><v-col cols="12" xl="2" lg="3" md="4" sm="6">
          <v-text-field
            v-model.trim="searchPattern"
            type="search"
            autocomplete="off"
            outlined
            label="searchPattern"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xl="2" lg="3" md="4" sm="6"
          ><v-btn color="primary" @click="searchGoods"> Search </v-btn>
          <v-btn color="primary" @click="clearSearch"> Clear </v-btn>
        </v-col>
        <v-col cols="12" xl="2" lg="3" md="4" sm="6">
          <v-select
            :items="categories"
            v-model="selectedCategory"
            label="Category"
            @change="selectCategory"
            outlined
          ></v-select>
        </v-col>
      </v-row>
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
    <!-- bottom goods list -->
    <v-divider v-intersect="onIntersect"></v-divider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { goodsCategories } from '~/data/const';
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
      takeGoods: 48,
      goodsFinished: false,
      isLoadding: false,
      isIntersecting: true,
      categories: goodsCategories,
      selectedCategory: '',
    };
  },

  methods: {
    async fetchGoods() {
      if (this.goodsFinished || this.isLoadding) {
        return;
      }
      this.isLoadding = true;
      const whereQuery: any = {};
      whereQuery.isActive = true;
      if (this.selectedCategory != 'all' && this.selectedCategory != '') {
        whereQuery.category = this.selectedCategory;
      }
      const goodsContent = await this.$content('goods')
        .only(['name', 'price', 'slug'])
        .where(whereQuery)
        .sortBy('priority', 'desc')
        .skip(this.goodsSkip)
        .limit(this.takeGoods)
        .search(this.searchPattern)
        .fetch();

      // console.log('goodsContent', goodsContent);

      goodsContent.forEach((goods1: any) => {
        const newGoodsExt1: GoodsExt = {
          id: goods1.slug,
          name: goods1.name,
          price: goods1.price,
        };
        this.goodsArr.push(newGoodsExt1);
      });

      if (goodsContent.length < this.takeGoods) {
        this.goodsFinished = true;
      }
      this.goodsSkip += this.takeGoods;
      this.isLoadding = false;
    },
    reFetchGoogs() {
      this.goodsSkip = 0;
      this.goodsFinished = false;
      this.goodsArr = [];
      this.isLoadding = false;
      this.fetchGoods();
    },
    searchGoods() {
      this.reFetchGoogs();
    },
    onIntersect(entries: any) {
      this.isIntersecting = entries[0].isIntersecting;
      if (this.isIntersecting) {
        this.fetchGoods();
      }
    },
    selectCategory() {
      console.log('this.selectedCategory', this.selectedCategory);

      this.reFetchGoogs();
    },
    clearSearch() {
      this.searchPattern = '';
      this.selectedCategory = '';
      this.reFetchGoogs();
    },
  },
  mounted() {
    this.fetchGoods();
  },
});
</script>
