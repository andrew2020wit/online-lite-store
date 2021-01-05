export const dateFormatMixin = {
  filters: {
    formatDate(dateIn: string | number) {
      const date1 = new Date(dateIn);
      return date1.toLocaleDateString();
    },
  },
};
