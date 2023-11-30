// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXNFbSLVlOvBI_oBcmjczhjo-w_dBuqFg",
  authDomain: "todo-75e52.firebaseapp.com",
  projectId: "todo-75e52",
  storageBucket: "todo-75e52.appspot.com",
  messagingSenderId: "747363530367",
  appId: "1:747363530367:web:7007943c688f4988b2b14a",
  measurementId: "G-CC8YERM1FS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
