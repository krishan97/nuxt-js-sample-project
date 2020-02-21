<template>
  <div>
    <Nav />
    <ErrorPage />
  </div>
</template>

<script>
import Nav from "~/components/Nav.vue";
import ErrorPage from "~/components/ErrorPage";
export default {
  components: {
    Nav,
    ErrorPage
  },
  props: ["error"],
  mounted:  async function () {
   await this.$store.dispatch("setFirstName");
  }
};
</script>