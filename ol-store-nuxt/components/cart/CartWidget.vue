<template>
  <v-card v-if="cartIsOpen">
    <v-card-title>Shoping Cart</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead v-if="items">
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Count</th>
            <th class="text-left">Price</th>
            <th class="text-left">ItemSum</th>
          </tr>
        </thead>
        <tfoot>
          <td></td>
          <td></td>
          <td></td>
          <td>
            Total: <strong> ${{ sum }} </strong>
          </td>
        </tfoot>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>
              <router-link :to="`/goods/` + item.id">
                {{ item.name }}
              </router-link>
            </td>
            <td>{{ item.count }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.price * item.count }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-text v-if="!items">
      <div>Cart is empty. Add here something!</div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn color="error" plain @click="clearCart"> Clear Cart </v-btn>
      <v-spacer />
      <v-btn color="primary" plain @click="hideCart"> Hide Cart </v-btn
      ><v-spacer />
      <v-btn color="primary" plain to="/order" :disabled="!items">
        Order
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
export default Vue.extend({
  computed: mapState('cart', ['cartItems', 'cartIsOpen', 'sum', 'items']),
  methods: {
    hideCart() {
      this.$store.commit('cart/hideCart');
    },
    clearCart() {
      this.$store.commit('cart/clearCart');
    },
  },
});
</script>
