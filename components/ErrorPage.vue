<template>
    <b-container class="error-temp">
      <h1> Oops!</h1>
      <h2>Page not found</h2>
      <p class="error-details">Sorry, an error has occured, Requested page not found!</p>
      <div class="actions">
      <nuxt-link to="/" class="home-btn-link btn-primary btn-lg"><BIconHouseFill></BIconHouseFill> Take Me Home</nuxt-link>
      </div>
    </b-container>
</template>
<script>
import {  BIconHouseFill } from 'bootstrap-vue'
export default {
   components: {
    BIconHouseFill
  },
}
</script>
<style>
.error-temp {
    text-align: center;
    padding: 100px 50px;
}
.actions{
  margin-top: 30px;
}
.home-btn-link, .home-btn-link:hover, .home-btn-link:focus{
    text-decoration: none;
}
.error-actions {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>