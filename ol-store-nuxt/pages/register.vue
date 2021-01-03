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
            v-model="password2"
            :rules="password2Rules"
            label="Password2"
            type="password"
            required
          ></v-text-field>

          <v-text-field
            v-model="fullName"
            :rules="fullNameRules"
            label="fullName"
            required
          ></v-text-field>

          <v-text-field
            v-model.trim="email"
            :rules="emailRules"
            label="email"
            type="email"
          ></v-text-field>

          <v-textarea
            outlined
            label="defaultDeliverAddress"
            v-model="defaultDeliverAddress"
            :rules="defaultDeliverAddressRules"
            required
          ></v-textarea>

          <v-btn color="primary" type="submit" :disabled="!formValid"
            >Register</v-btn
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
    password2: '',
    fullName: '',
    fullNameRules: [
      (v) => !!v || 'fullName is required',
      (v) =>
        (v.length >= 2 && v.length <= 20) || 'fullName must be 2-20 characters',
    ],
    email: '',
    emailRules: [
      (v) => /\S+@\S+\.\S+/.test(v) || v == '' || 'email must be like xx@yy.zz',
      (v) =>
        (v.length >= 2 && v.length <= 20) ||
        v == '' ||
        'email must be 2-20 characters',
    ],
    defaultDeliverAddress: '',
    defaultDeliverAddressRules: [
      (v) => !!v || 'defaultDeliverAddress is required',
      (v) =>
        (v.length >= 5 && v.length <= 500) ||
        'defaultDeliverAddress must be 5-500 characters',
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
            defaultDeliverAddress: this.defaultDeliverAddressRules,
            email: this.email,
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

  computed: {
    password2Rules() {
      let r = this.password2 == this.password;
      if (!r) {
        r = 'password != password2';
      }
      return [r];
    },
  },
};
</script>
