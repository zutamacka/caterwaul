import Vue from 'vue'

import { firebaseAuth, firebaseDb } from 'boot/firebase'
import store from '.'

// the data of the app goes here
const state = {
  userDetails: {},
  users: {},
  posts: {},
  otherUser: {
    name: '',
    email: '',
    userId: ''
  }
}

// methods for manipulating the data in store; can't be async
// can make instant changes
const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails)
  },
  updateUser(state, payload) {
    // this here has an issue
    if (payload.userId) {
      Object.assign(state.users[payload.userId], payload.userDetails)
    }
  },

  /* POSTS */
  addPost(state, payload) {
    Vue.set(state.posts, payload.postId, payload.postDetails)
  },
  updatePost(state, payload) {
    Object.assign(state.posts[payload.postId], payload.postDetails)
  },

  setOtherUser(state, payload) {
    if (payload.userId !== state.otherUser.userId) {
      state.otherUser = payload
    }
  }
}

//methods, can be async, can trigger mutations
const actions = {
  /* this method registers the user in firebase.auth and also
     puts the user info into the firebase.database. We need both.
  */
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        // write to the database
        console.log(response)
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).set({
          name: payload.uname,
          email: payload.email,
          online: true
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  /* this method logs in the user in firebase.auth and also  */
  loginUser({}, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  logOutUser() {
    firebaseAuth.signOut()
  },

  /* triggers when app starts  */
  handleAuthStateChanged({ commit, dispatch, state, storePosts }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in.
        let userId = firebaseAuth.currentUser.uid
        // update logged in state
        dispatch('firebaseUpdateUser', {
          userId: userId,
          updates: {
            online: true
          }
        })
        // collect user data and save it to state
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          let userDetails = snapshot.val()
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
        })
        // collect the list of users for display
        dispatch('firebaseGetUsers')
        // collect the list of users for display
        dispatch('firebaseGetPosts')
        // send the user to the next page
        this.$router.push('/')
      } else {
        // update logged in state
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        // User is logged out. Send an empty object to prep for a new user.
        commit('setUserDetails', {})
        this.$router.replace('/login')
      }
    })
  },

  /* handles the actual user state update */
  firebaseUpdateUser({}, payload) {
    let userDb = firebaseDb
      .ref('users/' + payload.userId)
      .update(payload.updates)
  },

  // collects users from the database.
  // Hook gets fired every time a user is added to db
  firebaseGetUsers({ commit }) {
    firebaseDb.ref('users').on('child_added', snapshot => {
      let userDetails = snapshot.val()
      userDetails.userId = snapshot.key
      let userId = snapshot.key
      commit('addUser', { userDetails, userId })
    })
    // changes every time data of a child changes
    firebaseDb.ref('users').on('child_changed', snapshot => {
      let userDetails = snapshot.val()
      userDetails.userId = snapshot.key
      let userId = snapshot.key
      commit('updateUser', { userDetails, userId })
    })
  },

  /* POSTS */
  // Hook gets fired every time a post is added to db
  firebaseGetPosts({ commit }) {
    let userId = firebaseAuth.currentUser.uid
    if (userId) {
      // refreshes every time a child is added
      firebaseDb
        .ref('caterwauls')
        .orderByChild('date')
        .on('child_added', snapshot => {
          let postDetails = snapshot.val()
          let postId = snapshot.key
          commit('addPost', { postDetails, postId })
        })
      // refreshes every time data of a child changes
      firebaseDb
        .ref('caterwauls')
        .orderByChild('date')
        .on('child_changed', snapshot => {
          let postDetails = snapshot.val()
          let postId = snapshot.key
          commit('updatePost', { postDetails, postId })
        })
    }
  },
  createPost({}, payload) {
    payload.userId = firebaseAuth.currentUser.uid
    var postListRef = firebaseDb.ref('caterwauls')
    var newPostRef = postListRef.push()
    newPostRef.set(payload)
  },
  deletePost({}, payload) {
    console.log('delete post:', payload)
  },
  likePost({}, payload) {
    console.log('like post:', payload)
  },

  // collect Other user data and save it to state
  firebaseGetOthersPosts({ commit }, payload) {
    firebaseDb.ref('users/' + payload).once('value', snapshot => {
      let userDetails = snapshot.val()
      userDetails.userId = payload
      commit('setOtherUser', {
        name: userDetails.name,
        email: userDetails.email,
        userId: payload
      })
    })
  }
}

// grab data from state and make it available to vue components
const getters = {
  users: state => {
    let usersFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFiltered[key] = state.users[key]
      }
    })
    return usersFiltered
  },
  /* POSTS */
  posts: state => {
    let postsFiltered = {}
    Object.keys(state.posts).forEach(key => {
      if (state.posts[key].userId === state.userDetails.userId) {
        postsFiltered[key] = state.posts[key]
      }
    })
    return postsFiltered
  },
  /* POSTS */
  othersPosts: state => {
    let postsFiltered = {}
    Object.keys(state.posts).forEach(key => {
      if (state.posts[key].userId === state.otherUser.userId) {
        postsFiltered[key] = state.posts[key]
      }
    })
    return postsFiltered
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
