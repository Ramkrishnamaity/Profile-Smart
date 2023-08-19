

import { initializeApp } from "firebase/app";
import {getAuth , signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {getFirestore, setDoc, getDoc, doc} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBUo4PoxhyC9DvkemZtxEVbaMslX5a5kNg",
  authDomain: "profilecreator-dc20c.firebaseapp.com",
  projectId: "profilecreator-dc20c",
  storageBucket: "profilecreator-dc20c.appspot.com",
  messagingSenderId: "422606067852",
  appId: "1:422606067852:web:4a1b4f47caaeca4ae583a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)




export {doc, db, setDoc, getDoc ,signOut, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged }