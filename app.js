// app.js
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const allowedEmails = ["freund1@example.com", "freund2@example.com"];

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => alert("Fehler beim Login: " + err.message));
};

window.register = function () {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (!allowedEmails.includes(email)) {
    alert("Diese E-Mail ist nicht zur Registrierung freigegeben.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Registrierung erfolgreich!"))
    .catch(err => alert("Fehler bei der Registrierung: " + err.message));
};
