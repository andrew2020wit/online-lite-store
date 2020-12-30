<template>
  <div>
    <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input v-model="login.login" type="text" />
      </div>
      <div>
        <label>Password</label>
        <input v-model="login.password" type="text" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        login: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        console.log('this.$auth', this.$auth)
        const response = await this.$auth.loginWith('local', {
          data: this.login,
        })
        console.log(response)
        console.log('this.$auth', this.$auth)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
