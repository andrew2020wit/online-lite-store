<template>
  <v-card>
    <v-card-title>Orders</v-card-title>

    <v-expansion-panels>
      <v-expansion-panel v-for="order in orders" :key="order.id">
        <v-expansion-panel-header>
          <div>
            Order N <strong> {{ order.id.slice(0, 5) }} </strong> , Created:
            {{ order.createdOn | formatDate }} OrderSum:
            <span> ${{ order.orderSum }} </span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Count</th>
                  <th class="text-left">Price</th>
                  <th class="text-left">ItemSum</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.items" :key="item.id">
                  <td>
                    <router-link :to="`/goods/` + item.goodsId">
                      {{ item.goods.name }}
                    </router-link>
                  </td>
                  <td>{{ item.count }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.price * item.count }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card-text v-if="!orders">
      <div>It is empty.</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { getOrdersEndPoint } from '~/data/const';
import { OrderEntity } from '~/data/order.class';
import { dateFormatMixin } from '~/components/dateFormatMixin';
export default Vue.extend({
  middleware: 'auth',
  mixins: [dateFormatMixin],
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    const getOrdersEndPoint1 = getOrdersEndPoint;
    this.$axios.$post(getOrdersEndPoint1, {}).then((x) => {
      console.log(x);
      this.orders = x;
    });
  },
});
</script>
