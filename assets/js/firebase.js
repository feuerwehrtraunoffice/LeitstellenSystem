const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_PROJEKT.firebaseapp.com",
  projectId: "DEIN_PROJEKT",
  storageBucket: "DEIN_PROJEKT.appspot.com",
  messagingSenderId: "DEINE_ID",
  appId: "DEINE_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = email.value;
  const password = password.value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = "index.html")
    .catch(err => alert(err.message));
});

// Registrierung
function register() {
  const email = prompt("E-Mail:");
  const password = prompt("Passwort:");
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Registrierung erfolgreich!"))
    .catch(err => alert(err.message));
}

// Einsätze anzeigen
const einsatzListe = document.getElementById("einsatzListe");
if (einsatzListe) {
  db.collection("einsaetze").onSnapshot(snapshot => {
    einsatzListe.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      einsatzListe.innerHTML += `<li>${data.titel} – ${data.status}</li>`;
    });
  });
}
