<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand to="/home">LOGO</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav class="custom-navigation">
            <b-nav-item to="/home" exact-active-class="active">Home</b-nav-item>
            <b-nav-item to="/posts" exact-active-class="active">Posts</b-nav-item>
            <b-nav-item to="/users" active-class="active">Users</b-nav-item>
            <b-nav-item to="/login" v-if="!$store.$storage.getUniversal('_login') && !$store.state.firstName" active-class="active">Login</b-nav-item>
          </b-navbar-nav>
          <b-nav-item-dropdown right v-if="$store.$storage.getUniversal('_login') && $store.state.firstName">
            <template v-slot:button-content>
              <em>{{$store.state.firstName}}</em>
            </template>
            <b-dropdown-item to="/profile" class="profile" active-class="active">Profile</b-dropdown-item> 
            <b-dropdown-item @click="logoutUser">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
export default {
  methods: {
    async logoutUser() {
      try {
        await this.$store.dispatch("logout");
        this.$toast.success("Successfully Logged out");
        this.$router.push({ path: "/login" });
      } catch (e) {
        this.$toast.success(e.message);
      }
    }
  }
};
</script>
<style>
.dropdown-menu a.dropdown-item:active, .dropdown-menu a.dropdown-item.active {
  background-color: #343a40 !important;
}
ul.navbar-nav.custom-navigation li {
  margin-right: 20px;
}
</style>