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
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <v-container>
        <v-row>
          <v-btn color="primary" plain to="/contacts"> Contacts </v-btn>
          <v-spacer />
          <v-btn color="primary" plain to="/about"> About </v-btn>
        </v-row></v-container
      >
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
