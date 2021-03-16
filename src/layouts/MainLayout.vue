<template>
  <q-layout view="lHr lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-weight-bolder">
          <span class="gt-sm"
            >CaterWaul
            <q-icon
              name="fas fa-paw"
              size="md"
              color="white"
              class="q-pa-md gt-sm header-icon-small"
            />
            {{ $route.name }}
          </span>
          <q-icon
            name="fas fa-paw"
            size="md"
            color="white"
            class="q-pa-md lt-md header-icon"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      :width="283"
      bordered
      class="text-dark"
    >
      <!-- drawer content -->
      <leftside-links />
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <!-- drawer content -->
      <q-input
        placeholder="Search CatterWaul"
        rounded
        outlined
        dense
        class="q-mt-sm q-ml-md q-mr-md q-mb-md"
      >
        <template v-slot:append>
          <q-icon name="fas fa-cat" size="md" color="secondary" />
        </template>
      </q-input>

      <!-- news feed -->
      <news-feed />
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import LeftsideLinks from "../components/LeftsideLinks";
import NewsFeed from "../components/NewsFeed";
export default {
  components: { NewsFeed, LeftsideLinks },
  name: "MainLayout",
  data() {
    return {
      left: false,
      right: false
    };
  }
};
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
.header-icon-small
  font-size: large
</style>
