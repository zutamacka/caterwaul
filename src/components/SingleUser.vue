<template>
  <div>
    <q-item class="q-pa-md">
      <q-item-section top avatar> </q-item-section>

      <q-item-section top avatar>
        <div class="col" clickable @click="goToProfile">
          <q-avatar size="xl">
            <img
              :class="[user.online ? '' : 'not-logged-in']"
              src="https://i.imgur.com/PqSNKmX.png"
            />
          </q-avatar>
          <span class="text-weight-bold q-px-sm">{{ user.name }}</span>
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "SingleUser",
  props: {
    user: Object
  },
  data() {
    return {};
  },
  methods: {
    goToProfile() {
      console.log(this.user);
    }
  }
};
</script>

<style lang="sass" scoped>
.not-logged-in
  filter: blur(1px) sepia()
</style>
