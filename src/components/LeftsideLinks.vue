<template>
  <div>
    <q-icon name="fas fa-paw" size="lg" color="primary" class="q-pa-md" />

    <q-list>
      <q-item clickable v-ripple to="/" exact>
        <q-item-section avatar>
          <q-icon name="home" size="md" />
        </q-item-section>

        <q-item-section class="h6 text-weight-bolder">Home</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/about" exact>
        <q-item-section avatar>
          <q-icon name="fas fa-cat" size="md" />
        </q-item-section>

        <q-item-section class="h6 text-weight-bolder">About</q-item-section>
      </q-item>

      <q-separator />
      <login-button />
    </q-list>
  </div>
</template>

<script>
import LoginButton from "./LoginButton.vue";
export default {
  components: { LoginButton },
  name: "LeftsideLinks"
};
</script>
