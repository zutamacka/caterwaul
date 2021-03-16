import firebase from "firebase/app";
//import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz9FpyMdcKBF2QoCrHCGeVpVEifG8X__8",
  authDomain: "caterwaul-8098f.firebaseapp.com",
  databaseURL: "https://caterwaul-8098f-default-rtdb.firebaseio.com",
  projectId: "caterwaul-8098f",
  storageBucket: "caterwaul-8098f.appspot.com",
  messagingSenderId: "1015425442854",
  appId: "1:1015425442854:web:25cd21f4821d58965772e7"
};

//firebaseApp.initializeApp(firebaseConfig);
let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebaseApp.firestore();
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

let kitty = "woo kitty hoo!";

export default db;
export { firebaseAuth, firebaseDb, kitty };
