<template>
  <v-container>
    <v-row>
      <v-col cols="12" xl="2" lg="3" md="4" sm="6">
        <v-card>
          <v-card-title> Profile </v-card-title>
          <v-card-text>
            <v-form v-model="formValid" @submit.prevent="editProfile">
              <v-text-field
                v-model="phone"
                :rules="phoneRules"
                label="Phone number"
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
                >Edit Profile</v-btn
              >
            </v-form></v-card-text
          >
        </v-card>
      </v-col>

      <v-col cols="12" xl="2" lg="3" md="4" sm="6">
        <v-card>
          <v-card-title> ChangePassword </v-card-title>
          <v-card-text>
            <v-form v-model="formPassWordValid" @submit.prevent="editPassword">
              <v-text-field
                v-model="currentPassword"
                :rules="currentPasswordRules"
                label="currentPassword"
                type="password"
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

              <v-btn
                color="primary"
                type="submit"
                :disabled="!formPassWordValid"
                >Edit Password</v-btn
              >
            </v-form>
          </v-card-text></v-card
        >
      </v-col>

      <v-col cols="12" xl="2" lg="3" md="4" sm="6" v-if="(userRole = `admin`)">
        <v-card>
          <v-card-title> AdminsFunction </v-card-title>
          <v-card-text>
            <ul>
              <li><v-btn color="primary" text to="/users">Users</v-btn></li>
            </ul>
          </v-card-text></v-card
        >
      </v-col>

      <v-col
        cols="12"
        xl="2"
        lg="3"
        md="4"
        sm="6"
        v-if="(userRole = `admin` || `manager`)"
      >
        <v-card>
          <v-card-title> Managers Function </v-card-title>
          <v-card-text> </v-card-text
        ></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { patternPhoneNumber } from '@/components/phone-number-utils';
import {
  getUserProfileEndPoint,
  editUserEndPoint,
  putOrderEndPoint,
  changeUserPasswordEndPoint,
} from '~/data/const';

export default {
  data: () => ({
    formValid: false,
    formPassWordValid: false,
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
    currentPassword: '',
    currentPasswordRules: [(v) => !!v || 'currentPassword'],

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
    userId: '',
    userRole: '',
  }),
  methods: {
    async editProfile() {
      try {
        const login = this.phone.replace(/\D/gi, '');

        await this.$axios
          .post(editUserEndPoint, {
            id: this.userId,
            login: login,
            phone: login,
            fullName: this.fullName,
            defaultDeliverAddress: this.defaultDeliverAddress,
            email: this.email,
          })
          .then((response) => {
            console.log(response);
          });
      } catch (err) {
        console.log(err);
      }
    },
    async editPassword() {
      try {
        await this.$axios
          .post(changeUserPasswordEndPoint, {
            currentPW: this.currentPassword,
            newPW: this.password,
          })
          .then((response) => {
            console.log(response);
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

  mounted() {
    this.$store.commit('cart/showCart');
    this.$axios.$get(getUserProfileEndPoint).then((userProfile) => {
      console.log('userProfile', userProfile);
      this.defaultDeliverAddress = userProfile.defaultDeliverAddress;
      this.phone = userProfile.login;
      this.fullName = userProfile.fullName;
      this.email = userProfile.email;
      this.userId = userProfile.id;
      this.userRole = userProfile.role;
    });
  },
};
</script>
