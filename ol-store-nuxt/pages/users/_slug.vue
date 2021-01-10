<template>
  <div>
    <h1>Admin: Edit User</h1>
    <p><router-link to="/users"> users list</router-link></p>
    <v-simple-table>
      <template v-slot:default
        ><tbody>
          <tr>
            <td>
              User Active: <strong> {{ user.isActive }} </strong>
            </td>
            <td>
              <v-btn color="primary" @click="switchIsActive"
                >Switch "isActive"</v-btn
              >
            </td>
          </tr>
          <tr>
            <td>
              User Role: <strong> {{ user.role }} </strong>
            </td>
            <td>
              <v-btn
                color="primary"
                @click="switchManager"
                :disabled="user.role == `admin`"
                >Switch Role "Manager/User"</v-btn
              >
            </td>
          </tr>
        </tbody></template
      >
    </v-simple-table>

    UserEntity:
    <pre>{{ user }}</pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { baseApiEndPoint, getUserEntityEP } from '~/data/const';
import { UserEntity, UserRole } from '~/data/user.entity';

class AdminUserQueryDTO {
  userId?: string;
  role?: UserRole;
  isActive?: boolean;
}

export default Vue.extend({
  data() {
    return {
      user: {} as UserEntity,
    };
  },
  methods: {
    switchIsActive() {
      const isActive = !this.user.isActive;
      this.$axios
        .$post(baseApiEndPoint + '/user/admin-change-user', {
          userId: this.user.id,
          isActive: isActive,
        })
        .then((x) => {
          console.log('x', x);
          this.$router.go(0);
        });
    },
    switchManager() {
      let role = 'manager';
      if (this.user.role == role) {
        role = 'user';
      }
      this.$axios
        .$post(baseApiEndPoint + '/user/admin-change-user', {
          userId: this.user.id,
          role: role,
        })
        .then((x) => {
          console.log('x', x);
          this.$router.go(0);
        });
    },
  },
  mounted() {
    const ep = getUserEntityEP + '/' + this.$route.params.slug;
    this.$axios.$get(ep).then((x) => {
      console.log(x);
      this.user = x;
    });
  },
});
</script>
