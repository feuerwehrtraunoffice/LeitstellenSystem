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
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        return db.collection("users").doc(uid).get();
      })
      .then((doc) => {
        if (doc.exists) {
          const role = doc.data().role;
          localStorage.setItem("userRole", role);
          window.location.href = "index.html";
        } else {
          alert("Keine Rolle zugewiesen. Bitte Admin kontaktieren.");
        }
      })
      .catch(err => alert("Fehler beim Login: " + err.message));
  });

  // Registrierung
  function register() {
    const email = prompt("E-Mail:");
    const password = prompt("Passwort:");
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        // Standardrolle setzen (z. B. "mitglied")
        return db.collection("users").doc(uid).set({
          email: email,
          role: "mitglied"
        });
      })
      .then(() => alert("Registrierung erfolgreich!"))
      .catch(err => alert("Fehler bei Registrierung: " + err.message));
  }

  // Einsatzdaten anzeigen (einsatz.html)
  const einsatzListe = document.getElementById("einsatzListe");
  if (einsatzListe) {
    db.collection("einsaetze").orderBy("zeit", "desc").onSnapshot(snapshot => {
      einsatzListe.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        einsatzListe.innerHTML += `<li><strong>${data.titel}</strong> – ${data.status}</li>`;
      });
    });
  }

  // Admin-Funktion: Einsatz hinzufügen (optional)
  const role = localStorage.getItem("userRole");
  if ((role === "admin" || role === "superuser") && document.getElementById("einsatzForm")) {
    document.getElementById("einsatzForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const titel = document.getElementById("einsatzTitel").value;
      const status = document.getElementById("einsatzStatus").value;
      db.collection("einsaetze").add({
        titel: titel,
        status: status,
        zeit: new Date().toISOString()
      }).then(() => {
        alert("Einsatz hinzugefügt!");
        document.getElementById("einsatzForm").reset();
      });
    });
  }
</script>
