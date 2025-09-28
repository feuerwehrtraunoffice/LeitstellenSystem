// app.js
import { auth } from './firebase-config.js';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyAQOOB8RtpiV1h4oV17nWXGs8xbje3QxMw",
  authDomain: "elis-traun.firebaseapp.com",
  projectId: "elis-traun",
  storageBucket: "elis-traun.firebasestorage.app",
  messagingSenderId: "512601294479",
  appId: "1:512601294479:web:dffe92d2f00ffaeb9852fa",
  measurementId: "G-GN9QM7R224"
};

// Initialisierung
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authInstance = getAuth(app);

// Liste erlaubter E-Mails für Registrierung
const allowedEmails = [
  "rokosseg@gmail.com",
  "freund1@example.at",
  "freund2@example.at"
];

// Registrierung mit Freigabeprüfung
window.register = function () {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (!allowedEmails.includes(email)) {
    alert("Diese E-Mail ist nicht zur Registrierung freigegeben.");
    return;
  }

  createUserWithEmailAndPassword(authInstance, email, password)
    .then(() => alert("Registrierung erfolgreich!"))
    .catch(err => alert("Fehler bei der Registrierung: " + err.message));
};

// Login
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(authInstance, email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => alert("Fehler beim Login: " + err.message));
};

// Logout
window.logout = function () {
  signOut(authInstance)
    .then(() => window.location.href = "index.html")
    .catch(err => alert("Fehler beim Logout: " + err.message));
};

// Rollenprüfung (z. B. für dashboard.html)
window.checkUserRole = async function () {
  onAuthStateChanged(authInstance, async user => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const role = userSnap.data().role;
        if (role === "superuser") {
          console.log("✅ Zugriff als Superuser erlaubt");
          // Hier kannst du Admin-Funktionen freischalten
        } else {
          console.log("⛔ Kein Superuser");
        }
      } else {
        console.log("⚠️ Kein Rollen-Dokument gefunden");
      }
    } else {
      window.location.href = "index.html";
    }
  });
};
