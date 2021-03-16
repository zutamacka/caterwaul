import firebase from "firebase/app";
//import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "set_up_your_own_firebase_app",
  authDomain: "set_up_your_own_firebase_app",
  databaseURL: "set_up_your_own_firebase_app",
  projectId: "set_up_your_own_firebase_app",
  storageBucket: "set_up_your_own_firebase_app",
  messagingSenderId: "set_up_your_own_firebase_app",
  appId: "set_up_your_own_firebase_app"
};

//firebaseApp.initializeApp(firebaseConfig);
let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebaseApp.firestore();
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

let kitty = "woo kitty hoo!";

export default db;
export { firebaseAuth, firebaseDb, kitty };
