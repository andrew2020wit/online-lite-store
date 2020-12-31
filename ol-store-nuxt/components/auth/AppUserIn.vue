<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" plain v-bind="attrs" v-on="on">
          {{ username }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <v-btn color="primary" plain to="/profile"
              >Profile</v-btn
            ></v-list-item-title
          >
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn color="primary" plain @click="logout"
              >Logout</v-btn
            ></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  computed: {
    username() {
      return this.$auth.user;
    },
  },
  methods: {
    async logout() {
      console.log('logout');
      await this.$auth.logout();
    },
  },
});
</script>
