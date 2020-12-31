<template>
  <!-- register -->
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <h3>Register</h3>
        <v-form v-model="formValid" @submit.prevent="userLogin">
          <v-text-field
            v-model="phone"
            :rules="phoneRules"
            label="Phone number"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-text-field
            v-model="fullName"
            :rules="fullNameRules"
            :counter="20"
            label="fullName"
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
import { patternPhoneNumber } from '@/components/phone-number-utils';
import { createUserEndPoint } from '@/data/const';
export default {
  data: () => ({
    formValid: false,
    phone: '',
    phoneRules: [
      (v) => !!v || 'Phone is required',
      (v) => patternPhoneNumber.test(v) || 'Phone must be like 38-097-123-1234',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        (v.length >= 2 && v.length <= 30) || 'Password must be 2-30 characters',
    ],
    fullName: '',
    fullNameRules: [
      (v) => !!v || 'fullName is required',
      (v) =>
        (v.length >= 2 && v.length <= 20) || 'fullName must be 2-20 characters',
    ],
  }),
  methods: {
    async userLogin() {
      try {
        const login = this.phone.replace(/\D/gi, '');

        await this.$axios
          .post(createUserEndPoint, {
            login,
            password: this.password,
            fullName: this.fullName,
          })
          .then((response) => {
            console.log(response);
            this.$auth.loginWith('local', {
              data: { login, password: this.password },
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
