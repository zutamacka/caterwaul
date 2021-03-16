<template>
  <q-page class="q-pa-lg">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="Login" label="Log In" />
        <q-tab name="Register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Login">
          <user-login :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="Register">
          <user-login :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import UserLogin from "../components/UserLogin";

export default {
  name: "Login",
  components: { UserLogin },
  data() {
    return {
      tab: "Login"
    };
  }
};
</script>
