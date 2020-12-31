<template>
  <v-app>
    <v-app-bar app flat>
      <v-container>
        <v-row>
          <NuxtLink to="/" exact-active-class="active-link">
            <v-toolbar-title v-text="title" />
          </NuxtLink>
          <v-spacer />
          <AppUser /> </v-row
      ></v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <v-container> <v-row> Footer</v-row></v-container>
    </v-footer>
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
