<template>
  <v-app>
    <v-app-bar app flat>
      {{ title }}

      <AppUser />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app> Footer </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { priceData } from '@/data/price';
export default Vue.extend({
  data() {
    return {
      title: 'LiteStore',
    };
  },
});
</script>
