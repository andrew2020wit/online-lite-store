<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});

export const shortNameMixin = {
  filters: {
    shortName(longName: string) {
      const maxLength = 35;
      if (longName.length > maxLength) {
        return longName.slice(0, maxLength) + '...';
      } else {
        return longName;
      }
    },
  },
};
</script>
