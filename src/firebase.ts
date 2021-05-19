import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs_MHRczbbE6smW-kPAQiH8qfUIYbSxoc",
  authDomain: "aksjelog.firebaseapp.com",
  projectId: "aksjelog",
  storageBucket: "aksjelog.appspot.com",
  messagingSenderId: "993203049696",
  appId: "1:993203049696:web:ce5f698c0e3a5c8068ec85",
  measurementId: "G-H0QFZ11SDW",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
