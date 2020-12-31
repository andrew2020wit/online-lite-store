<template>
  <v-app>
    <v-app-bar app flat>
      <NuxtLink to="/" exact-active-class="active-link">
        <v-toolbar-title v-text="title" />
      </NuxtLink>
      <v-spacer />
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
