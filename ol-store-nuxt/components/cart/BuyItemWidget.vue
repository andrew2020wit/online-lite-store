<template>
  <div>
    <strong>Price: ${{ price }}</strong>
    <v-form v-model="formValid" @submit.prevent="submit">
      <v-text-field
        v-model="count"
        :rules="countRules"
        label="Goods count"
        type="number"
        required
      ></v-text-field>
      <v-btn color="primary" type="submit" :disabled="count <= 0">Buy</v-btn>
      <v-btn color="primary" @click="add"> +1 </v-btn>
      <v-btn color="error" :disabled="!count" @click="clear">Clear</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CartItem } from '~/store/cart';
export default Vue.extend({
  props: {
    goodsId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  data() {
    return {
      formValid: false,
      count: 1,
      countRules: [
        (v: number) => v >= 0 || 'It can`t less then 0',
        (v: number) => v <= 1000 || 'You can`t take that much!',
      ],
    };
  },
  methods: {
    submit() {
      if (!this.count) {
        this.count = 0;
      }
      const newItem = new CartItem(
        this.goodsId,
        this.name,
        this.count,
        this.price
      );
      this.$store.commit('cart/setCartItem', newItem);
    },
    add() {
      this.count++;
    },
    clear() {
      this.count = 0;
      this.submit();
    },
  },
});
</script>
