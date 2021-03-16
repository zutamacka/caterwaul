<template>
  <div>
    <q-item clickable v-ripple to="/login" exact v-if="!userDetails.name">
      <q-item-section avatar>
        <q-icon name="fas fa-sign-out-alt" size="md" />
      </q-item-section>
      <q-item-section class="h6 text-weight-bolder">Login</q-item-section>
    </q-item>

    <div v-else>
      <div class="col q-pa-md">
        <q-avatar size="xl">
          <img src="https://i.imgur.com/PqSNKmX.png" />
        </q-avatar>
        <span class="text-weight-bold q-px-sm">{{ userDetails.name }}</span>
      </div>

      <q-item clickable v-ripple to="/" exact>
        <q-item-section avatar>
          <q-icon name="fas fa-sign-in-alt" size="md" @click="logOutUser" />
        </q-item-section>
        <q-item-section class="h6 text-weight-bolder">Log Out</q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("store", ["userDetails"])
  },
  methods: {
    ...mapActions("store", ["logOutUser"])
  }
};
</script>

<style lang="sass" scoped></style>
