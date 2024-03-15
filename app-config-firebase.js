
import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyA7jbhpoJwKIJJWjqELVJW1n8itL_t69Bc",
  authDomain: "event-fcf53.firebaseapp.com",
  projectId: "event-fcf53",
  storageBucket: "event-fcf53.appspot.com",
  messagingSenderId: "831855426135",
  appId: "1:831855426135:web:8271fbea7984473fc90112"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig); 
 export const storage = getStorage(app)
/*  export const db =() */