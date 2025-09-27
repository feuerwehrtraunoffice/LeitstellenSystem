// app.js
const allowedEmails = ["freund1@example.com", "freund2@example.com"];

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => alert("Fehler: " + err.message));
}

function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  if (!allowedEmails.includes(email)) {
    alert("Diese E-Mail ist nicht zur Registrierung freigegeben.");
    return;
  }
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => alert("Registrierung erfolgreich!"))
    .catch(err => alert("Fehler: " + err.message));
}
