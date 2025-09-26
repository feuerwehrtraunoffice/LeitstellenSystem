<!-- Firebase SDKs einbinden -->
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"></script>

<script>
  // Firebase-Konfiguration
  const firebaseConfig = {
    apiKey: "AIzaSyAmvAHTveikDorxGhdXWq0QJbmjbYk1VQI",
    authDomain: "leitstellenprojekt.firebaseapp.com",
    projectId: "leitstellenprojekt",
    storageBucket: "leitstellenprojekt.firebasestorage.app",
    messagingSenderId: "126344842577",
    appId: "1:126344842577:web:ebb9c91a94aa2361a65770",
    measurementId: "G-TZGL7E1LQ9"
  };

  // Firebase initialisieren
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Login-Logik
  document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = "index.html")
      .catch(err => alert("Fehler beim Login: " + err.message));
  });

  // Registrierung
  function register() {
    const email = prompt("E-Mail:");
    const password = prompt("Passwort:");
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => alert("Registrierung erfolgreich!"))
      .catch(err => alert("Fehler bei Registrierung: " + err.message));
  }

  // Einsatzdaten anzeigen (einsatz.html)
  const einsatzListe = document.getElementById("einsatzListe");
  if (einsatzListe) {
    db.collection("einsaetze").onSnapshot(snapshot => {
      einsatzListe.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        einsatzListe.innerHTML += `<li><strong>${data.titel}</strong> – ${data.status}</li>`;
      });
    });
  }
</script>
