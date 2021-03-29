import firebase from "firebase/app";
//import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "insert_your_own_data",
  authDomain: "insert_your_own_data",
  databaseURL: "insert_your_own_data",
  projectId: "insert_your_own_data",
  storageBucket: "insert_your_own_data",
  messagingSenderId: "insert_your_own_data",
  appId: "insert_your_own_data",
};

//firebaseApp.initializeApp(firebaseConfig);
let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebaseApp.firestore();
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

let kitty = "woo kitty hoo!";

export default db;
export { firebaseAuth, firebaseDb, kitty };
