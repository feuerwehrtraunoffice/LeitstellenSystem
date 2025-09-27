// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQOOB8RtpiV1h4oV17nWXGs8xbje3QxMw",
  authDomain: "elis-traun.firebaseapp.com",
  projectId: "elis-traun",
  storageBucket: "elis-traun.firebasestorage.app",
  messagingSenderId: "512601294479",
  appId: "1:512601294479:web:dffe92d2f00ffaeb9852fa",
  measurementId: "G-GN9QM7R224"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
