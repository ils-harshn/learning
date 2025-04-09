// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace below config with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDYujrU4VA-Is32zDvD0bCg0i_Z7FLP0So",
  authDomain: "realtimepoc-43396.firebaseapp.com",
  projectId: "realtimepoc-43396",
  storageBucket: "realtimepoc-43396.firebasestorage.app",
  messagingSenderId: "672493556189",
  appId: "1:672493556189:web:7f9ef500394468fdee2634",
  measurementId: "G-GFFJ62CSNT",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
