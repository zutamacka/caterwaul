<template>
  <div>
    <q-list separator>
      <single-caterwaul
        v-for="Cwaul in posts"
        :key="Cwaul.id"
        :Cwaul="Cwaul"
        v-on:deleteCwaul="deleteThisCwaul(Cwaul)"
        v-on:likeCwaul="likeThisCwaul(Cwaul)"
        v-on:commentCwaul="commentThisCwaul(Cwaul)"
      />
    </q-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SingleCaterwaul from './SingleCaterwaul'
export default {
  name: 'Caterwauls',
  components: { SingleCaterwaul },
  props: {
    posts: Object
  },
  methods: {
    ...mapActions('store', [
      'deletePost',
      'likePost',
      'firebaseStopGettingPosts'
    ]),
    deleteThisCwaul(Cwaul) {
      console.log('delete thisCwaul')
      this.deletePost(Cwaul)
    },
    likeThisCwaul(Cwaul) {
      console.log('like this Cwaul')
      this.likePost(Cwaul)
    },
    commentThisCwaul(Cwaul) {
      console.log('comment this Cwaul')
      console.log('posts:', this.posts)
    }
  }
}
</script>

<style lang="scss" scoped></style>
