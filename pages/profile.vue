<template>
  <div class="profile-form">
    <h1>Profile</h1>
    <b-form v-if="userInfo" @submit.prevent="updateProfile">
      <b-form-group id="input-group-2">
        <label>
          First Name
          <span class="req" label-for="input-2">*</span>
        </label>
        <b-form-input
          id="input-2"
          v-model="userInfo.firstName"
          type="text"
          placeholder="Enter first name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3">
        <label>
          Last Name
          <span class="req" label-for="input-3">*</span>
        </label>
        <b-form-input
          id="input-3"
          v-model="userInfo.lastName"
          type="text"
          placeholder="Enter last name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1">
        <label>
          Email Address
          <span class="req" label-for="input-1">*</span>
        </label>
        <b-form-input
          id="input-1"
          v-model="userInfo.email"
          type="email"
          readonly
          disabled
          aria-readonly="readonly"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-6">
        <label>
          Phone
          <span class="req" label-for="input-6">*</span>
        </label>
        <b-form-input
          id="input-6"
          v-model="userInfo.phone"
          type="tel"
          aria-readonly="readonly"
          placeholder="Enter phone"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5">
        <label>
          Gender
          <span class="req" label-for="input-5">*</span>
        </label>
        <b-form-radio-group id="input-5" v-model="userInfo.gender" name="radio-sub-component">
          <b-form-radio value="male">Male</b-form-radio>
          <b-form-radio value="female">Female</b-form-radio>
          <b-form-radio value="other">Other</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group id="input-group-4" label="Address" label-for="input-4">
        <b-form-textarea
          id="input-4"
          v-model="userInfo.address"
          placeholder="Enter address..."
          rows="3"
        ></b-form-textarea>
      </b-form-group>
      <b-button
        type="submit"
        :disabled="!userInfo.firstName || !userInfo.lastName || !userInfo.phone || !userInfo.gender"
        variant="primary"
      >Submit</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  layout: "custom",
  middleware: "authenticated",
  data() {
    return {
      userInfo: {
        firstName: this.$store.state.userInfo.firstName, 
        lastName: this.$store.state.userInfo.lastName,
        email: this.$store.state.userInfo.email,
        address: this.$store.state.userInfo.address,
        gender: this.$store.state.userInfo.gender,
        phone: this.$store.state.userInfo.phone
      }
    };
  },
  head() {
    return {
      title: "Profile"
    };
  },
  fetch({ store }) {
    return store.dispatch("getUserInfo");
  },
  methods: {
    async updateProfile() {
      try {
        await this.$store.dispatch("updateProfile", this.userInfo);
        this.userInfo = {
        firstName: this.$store.state.userInfo.firstName, 
        lastName: this.$store.state.userInfo.lastName,
        email: this.$store.state.userInfo.email,
        address: this.$store.state.userInfo.address,
        gender: this.$store.state.userInfo.gender,
        phone: this.$store.state.userInfo.phone
      };
       this.$toast.success('Profile updated successfully')
      } catch (e) {
        this.$toast.error(e.message)
      }
    }
  },
};
</script>
<style>
.profile-form {
  max-width: 400px;
  min-width: 300px;
  width: 100%;
  margin: 20px auto;
  padding: 50px 0px;
}
.req {
  color: #f00;
}
</style>
 