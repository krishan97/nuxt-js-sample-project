<template>
  <div>
    <h1>Users</h1>
    <b-table
      id="myTable"
      striped
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
    ></b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      aria-controls="myTable"
    ></b-pagination>
  </div>
</template>
<script>
export default {
  layout: "custom",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: "id",
          label: 'Sr. No.',
          sortable: false
        },
        {
          key: "employee_name",
          label: 'Name',
          sortable: true
        },
        {
          key: "employee_salary",
          label: 'Salary',
          sortable: true
        },
        {
          key: "employee_age",
          label: 'Age',
          sortable: true
        }
      ],
      items:  this.$store.state.employees
    };
  },
  head() {
    return {
      title: "Users"
    };
  },
  fetch({ store }) {
    return store.dispatch("getEmployee");
  },
  computed: {
      rows() {
        return this.items.length
      }
  }
};
</script>
<style>
.pagination {
    justify-content: flex-end;
}
</style>
