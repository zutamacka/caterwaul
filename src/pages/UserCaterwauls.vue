<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-height full-width">
      <!-- header cat -->
      <top-cat />
      <div hidden>{{ $route.params.otherUserId }}</div>
      <single-user :user="otherUser" />
      <h6>These are my caterwauls.</h6>

      <!-- input section -->
      <q-separator size="11px" color="searchback" class="caterwaul-main-sep" />
      <caterwauls :posts="othersPosts" />
    </q-scroll-area>
  </q-page>
</template>

<script>
import TopCat from '../components/TopCat.vue'
import Caterwauls from '../components/Caterwauls.vue'
import SingleUser from '../components/SingleUser.vue'
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  components: { TopCat, Caterwauls, SingleUser },
  name: 'Home',
  methods: {
    ...mapActions('store', ['firebaseGetOthersPosts'])
  },
  updated() {
    this.firebaseGetOthersPosts(this.$route.params.otherUserId)
  },
  computed: {
    ...mapGetters('store', ['othersPosts']),
    ...mapState('store', ['otherUser'])
  }
}
</script>

<style lang="sass" scoped>
.caterwaul-main-sep
  border-top: 2px solid
  border-bottom: 2px solid
  border-color: $grey-3
  margin-top: 2px
</style>
