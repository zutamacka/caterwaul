import { firebaseAuth, firebaseDb } from "boot/firebase";

// the data of the app goes here
const state = {
  userDetails: {}
};

// methods for manipulating the data; can't be async
// can make instant changes
const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload;
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
        console.log(response);
        // write to the database
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
  handleAuthStateChanged({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in.
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).once("value", snapshot => {
          let userDetails = snapshot.val();
          commit("setUserDetails", {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          });
        });
        this.$router.push("/");
      } else {
        // User is logged out. Send an empty object to prep for a new user.
        commit("setUserDetails", {});
        this.$router.replace("/login");
      }
    });
  }
};

// grab data from state and make it available to vue components
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

// namespaced means this stuff is local to this store module
