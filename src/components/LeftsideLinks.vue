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
      <q-item clickable v-ripple to="/login" exact>
        <q-item-section avatar>
          <q-icon name="fas fa-sign-out-alt" size="md" />
        </q-item-section>

        <q-item-section class="h6 text-weight-bolder">Login</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "LeftsideLinks"
};
</script>
