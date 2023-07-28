import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuJlJ0ssjtMHj42LU7BIV68l6doDz0EAM",
  authDomain: "messenger-9a7c5.firebaseapp.com",
  projectId: "messenger-9a7c5",
  storageBucket: "messenger-9a7c5.appspot.com",
  messagingSenderId: "26404425142",
  appId: "1:26404425142:web:49e2938bbe4beb6b4d0517"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore()
