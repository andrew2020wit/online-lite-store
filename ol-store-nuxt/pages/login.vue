<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-form v-model="formValid" @submit.prevent="userLogin">
          <v-text-field
            v-model="login"
            :rules="loginRules"
            :counter="20"
            label="Login"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :counter="20"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn color="primary" type="submit" :disabled="!formValid"
            >Submit</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    formValid: false,
    login: '',
    loginRules: [
      (v) => !!v || 'Login is required',
      (v) =>
        (v.length >= 2 && v.length <= 20) || 'Login must be 2-20 characters',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        (v.length >= 2 && v.length <= 20) || 'Password must be 2-20 characters',
    ],
  }),
  methods: {
    async userLogin() {
      try {
        console.log('this.$auth', this.$auth);
        const response = await this.$auth.loginWith('local', {
          data: { login: this.login, password: this.password },
        });
        console.log(response);
        console.log('this.$auth', this.$auth);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
