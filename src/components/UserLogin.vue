<template>
  <div>
    <div class="text-h6">User {{ tab }}</div>
    <q-form @submit="submitForm">
      <div class="q-gutter-md">
        <q-input
          v-if="tab === 'Register'"
          v-model="formData.uname"
          type="name"
          label="Username"
          class="q-mb-md"
        />
        <q-input
          v-model="formData.email"
          type="email"
          label="e-mail"
          class="q-mb-md"
        />
        <q-input
          v-model="formData.password"
          type="password"
          label="Password"
          class="q-mb-md"
          v-on:keyup.enter="submitForm"
        />
        <div class="row">
          <q-space></q-space>
          <q-btn
            type="submit"
            :disable="!formData.email"
            class="q-mb-md"
            push
            round
            color="primary"
            icon="fas fa-paw"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UserLogin",
  props: {
    tab: String
  },
  data() {
    return {
      formData: {
        uname: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("store", ["registerUser", "loginUser"]),
    submitForm() {
      if (this.tab === "Login") {
        console.log("Login The user");
        this.loginUser(this.formData);
      } else if (this.tab === "Register") {
        console.log("Register The user");
        this.registerUser(this.formData);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
