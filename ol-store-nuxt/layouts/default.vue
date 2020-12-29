<template>
  <v-app>
    <v-app-bar app flat>
      {{ title }}
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app> Footer </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'LiteStore',
    }
  },
}
</script>
