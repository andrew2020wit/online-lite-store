<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <h3>Order</h3>
        <v-form v-model="formValid" @submit.prevent="orderSubmit">
          <v-textarea
            outlined
            label="deliverAddress"
            v-model="deliverAddress"
            :rules="deliverAddressRules"
            required
          ></v-textarea>

          <v-textarea
            outlined
            label="customerComment"
            v-model="customerComment"
          ></v-textarea>

          <v-btn color="primary" type="submit" :disabled="!formValid"
            >Order</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { CartItem } from '~/store/cart';
import { putOrderEndPoint } from '~/data/const';
import { OrderEntity, OrderItemEntity } from '~/data/order.class';

export default Vue.extend({
  middleware: 'auth',
  data() {
    return {
      formValid: false,
      deliverAddress: '',
      deliverAddressRules: [
        (v: string) => !!v || 'defaultDeliverAddress is required',
        (v: string) =>
          (v.length >= 5 && v.length <= 500) ||
          'defaultDeliverAddress must be 5-500 characters',
      ],
      customerComment: '',
    };
  },
  computed: mapState('cart', ['cartItems', 'cartIsOpen', 'sum', 'items']),
  methods: {
    orderSubmit() {
      const putOrderEndPoint1 = putOrderEndPoint;
      if (this.sum == 0) {
        alert('Cart is empty!');
        return;
      }
      const items: OrderItemEntity[] = [];
      for (let key in this.cartItems) {
        const item = this.cartItems[key];
        const orderItemEntity = new OrderItemEntity(
          item.id,
          item.count,
          item.price
        );
        // console.log('orderItemEntity', orderItemEntity);

        items.push(orderItemEntity);
      }
      const orderEntity = new OrderEntity(
        items,
        this.deliverAddress,
        this.customerComment
      );
      // console.log('orderEntity', orderEntity);
      this.$axios.$put(putOrderEndPoint1, orderEntity).then((res) => {
        console.log(res);
        this.$store.commit('cart/clearCart');
        this.$router.push('/orders');
      });
    },
  },
  mounted() {
    this.$store.commit('cart/showCart');
  },
});
</script>
