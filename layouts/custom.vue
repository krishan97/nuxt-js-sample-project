<template>
  <div>
    <Nav />
    <b-container class="body-container">
      <nuxt />
    </b-container>
  </div>
</template>
  <script>
import Nav from "~/components/Nav.vue";
export default {
  components: {
    Nav
  },
  mounted:  async function () {
   await this.$store.dispatch("setFirstName");
  }
};
</script>
<style>
.body-container {
  background: #fefefe;
}
</style>
