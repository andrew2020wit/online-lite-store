<template>
  <div>
    <v-container>
      <v-row
        ><v-col cols="12" xl="2" lg="3" md="4" sm="6">
          <v-text-field
            v-model.trim="searchPattern"
            type="search"
            autocomplete="off"
            outlined
            label="searchPattern"
            @keydown.enter="searchEntity"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xl="2" lg="3" md="4" sm="6"
          ><v-btn color="primary" @click="searchEntity"> Search </v-btn>
          <v-btn color="primary" @click="clearSearch"> Clear </v-btn>
        </v-col>
      </v-row>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>FullName</th>
              <th>ID</th>
              <th>Role</th>
              <th>Is active</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in entities" :key="user.id">
              <td>{{ user.fullName }}</td>
              <td>{{ user.id }}</td>
              <td>{{ user.role }}</td>
              <td>{{ user.isActive }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <!-- bottom goods list -->
    <v-divider v-intersect="onIntersect"></v-divider>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import Vue from 'vue';
import { queryUsersEndPoint } from '~/data/const';
import { QueryEntityDto } from '~/data/order.class';
import { UserEntity } from '~/data/user.entity';

export default Vue.extend({
  data() {
    return {
      searchPattern: '',
      entities: [] as UserEntity[],
      skip: 0,
      take: 48,
      finished: false,
      isLoadding: false,
      isIntersecting: true,
      createdOnLessThan: new Date(),
    };
  },

  methods: {
    async fetchEntity() {
      if (this.finished || this.isLoadding) {
        return;
      }
      this.isLoadding = true;
      const queryEntityDto: QueryEntityDto = {
        pattern: this.searchPattern,
        maxItemCount: this.take,
        createdOnLessThan: this.createdOnLessThan,
      };

      console.log('queryEntityDto', queryEntityDto);

      let newEntity: UserEntity[] = [];

      await this.$axios.$post(queryUsersEndPoint, queryEntityDto).then((x) => {
        console.log(x);
        newEntity = x as UserEntity[];
      });

      newEntity.forEach((x) => {
        this.entities.push(x);
      });

      if (newEntity.length < this.take) {
        this.finished = true;
      }

      if (newEntity.length > 0) {
        this.createdOnLessThan = newEntity[newEntity.length - 1]
          .createdOn as Date;
      }

      this.isLoadding = false;
    },
    reFetchEntity() {
      this.skip = 0;
      this.finished = false;
      this.entities = [];
      this.isLoadding = false;
      this.createdOnLessThan = new Date();
      this.fetchEntity();
    },
    searchEntity() {
      this.reFetchEntity();
    },
    onIntersect(entries: any) {
      this.isIntersecting = entries[0].isIntersecting;
      if (this.isIntersecting) {
        this.fetchEntity();
      }
    },
    clearSearch() {
      this.searchPattern = '';
      this.reFetchEntity();
    },
  },
  mounted() {
    this.reFetchEntity();
  },
});
</script>
