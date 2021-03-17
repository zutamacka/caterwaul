import Vue from "vue";
import { firebaseAuth, firebaseDb } from "boot/firebase";

// the data of the app goes here
const state = {
  userDetails: {},
  users: {}
};

// methods for manipulating the data; can't be async
// can make instant changes
const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload;
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails);
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails);
  }
};

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
        console.log(response);
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).set({
          name: payload.uname,
          email: payload.email,
          online: true
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  },
  /* this method logs in the user in firebase.auth and also  */
  loginUser({}, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.message);
      });
  },
  logOutUser() {
    firebaseAuth.signOut();
  },

  /* triggers when app starts  */
  handleAuthStateChanged({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in.
        let userId = firebaseAuth.currentUser.uid;
        // update logged in state
        dispatch("firebaseUpdateUser", {
          userId: userId,
          updates: {
            online: true
          }
        });
        // collect user data and save it to state
        firebaseDb.ref("users/" + userId).once("value", snapshot => {
          let userDetails = snapshot.val();
          commit("setUserDetails", {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          });
        });
        // collect the list of users for display
        dispatch("firebaseGetUsers");
        // send the user to the next page
        this.$router.push("/");
      } else {
        // update logged in state
        dispatch("firebaseUpdateUser", {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        });
        // User is logged out. Send an empty object to prep for a new user.
        commit("setUserDetails", {});
        this.$router.replace("/login");
      }
    });
  },

  /* handles the actual user state update */
  firebaseUpdateUser({}, payload) {
    let userDb = firebaseDb
      .ref("users/" + payload.userId)
      .update(payload.updates);
  },

  // collects users from the database.
  // Hook gets fired every time a user is added to db
  firebaseGetUsers({ commit }) {
    firebaseDb.ref("users").on("child_added", snapshot => {
      let userDetails = snapshot.val();
      let userId = snapshot.key;
      commit("addUser", { userDetails, userId });
    });
    // changes every time data of a child changes
    firebaseDb.ref("users").on("child_changed", snapshot => {
      let userDetails = snapshot.val();
      let userId = snapshot.key;
      commit("updateUser", { userDetails, userId });
    });
  }
};

// grab data from state and make it available to vue components
const getters = {
  users: state => {
    let usersFiltered = {};
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFiltered[key] = state.users[key];
      }
    });
    return usersFiltered;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
// namespaced means this stuff is local to this store module
