<template>
  <div>
      <Nav />
    <Slider class="home-silder" /> 
   <b-container class="body-container">
    <nuxt />
    </b-container>
  </div>
</template>
  <script>
import Nav from "~/components/Nav.vue";
import Slider from "~/components/Slider.vue";
export default {
  components: {
    Nav,
    Slider
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
.home-silder{
    max-width: 1366px;
    margin: 0 auto;
}
</style>
