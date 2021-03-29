import Vue from 'vue'
import { firebaseAuth, firebaseDb } from 'boot/firebase'

// the data of the app goes here
const state = {
  posts: {}
}

// methods for manipulating the data; can't be async
// can make instant changes
const mutations = {
  addPost(state, payload) {
    Vue.set(state.posts, payload.postId, payload.postDetails)
  },
  updatePost(state, payload) {
    Object.assign(state.posts[payload.postId], payload.postDetails)
  }
}

//methods, can be async, can trigger mutations
const actions = {
  testStorePosts() {
    console.log('hey were in Store Posts! VICTORY!')
  },
  // collects users from the database.
  // Hook gets fired every time a user is added to db
  firebaseGetPosts({ commit }) {
    let userId = firebaseAuth.currentUser.uid
    console.log('userId', userId)
    if (userId) {
      firebaseDb.ref('caterwauls').on('child_added', snapshot => {
        let postDetails = snapshot.val()
        let postId = snapshot.key
        commit('addPost', { postDetails, postId })
      })
      // changes every time data of a child changes
      firebaseDb.ref('caterwauls').on('child_changed', snapshot => {
        let postDetails = snapshot.val()
        let postId = snapshot.key
        commit('updatePost', { postDetails, postId })
      })
    }
  }
}

// grab data from state and make it available to vue components
const getters = {
  posts: state => {
    console.log("I'm in here, lost")
    return state.posts
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
// namespaced means this stuff is local to this store module
