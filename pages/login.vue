<template>
  <div class="login">
    <h2>Login</h2>
    <b-form class="login-form" @submit.prevent="login">
      <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" :disabled="!form.email || !form.password" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  layout: "custom",
  middleware: "no-authenticated",
  head() {
    return {
      title: "Login"
    };
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", this.form);
        this.formUserEmail = "";
        this.formPassword = "";
        this.$toast.success('Successfully loggedIn')
        this.$router.push({ path: "/home" });
      } catch (e) {
        this.$toast.error(e.message);
      }
    }
  }
};
</script>
<style>
.login {
  padding: 100px 0px;
  max-width: 300px;
  margin: 10% auto;
}
.login h2 {
  text-align: center;
  margin-bottom: 20px;
}
.login-form {
  margin: 0px auto;
}
p.error {
  color: #f00;
}
button.btn.btn-primary.disabled {
  cursor: not-allowed;
}
</style>
