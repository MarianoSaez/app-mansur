// Importar las funciones necesarias de los SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Configuración de Firebase
const app = initializeApp({
    apiKey: "AIzaSyAziLeH2rqtB2k4XddPiatQyYJFFfNdr1I",
    authDomain: "banded-meridian-411320.firebaseapp.com",
    projectId: "banded-meridian-411320",
    storageBucket: "banded-meridian-411320.appspot.com",
    messagingSenderId: "928993055960",
    appId: "1:928993055960:web:9f4304c0b3d7d8aefd73ad"
});
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
        console.log("Usuario logueado");
        // Mostrar el botón de logout y ocultar el de login
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
        user.getIdToken().then(function (token) {
            document.cookie = "token=" + token;
        });

    } else {
        console.log("sesion cerrada");
    }
})

// Login logic
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});

// log out logic
document.getElementById("logout-btn").addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        await logout()

        // Ocultar el botón de logout y mostrar el de login
        document.getElementById("logout-btn").style.display = "none";
        document.getElementById("login-btn").style.display = "block";

        // Puedes redirigir al usuario a la página principal o mostrar un mensaje de logout exitoso
        alert("Has cerrado sesión correctamente.");
    } catch (error) {
        alert("Error al cerrar sesión: " + error.message);
    }
});

// Auxiliar functions
function login(email, password) {
    console.log('Login');
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Inicio de sesión exitoso
            const user = userCredential.user;
            $('#loginModal').modal('hide');

            // Mostrar el botón de logout y ocultar el de login
            document.getElementById("login-btn").style.display = "none";
            document.getElementById("logout-btn").style.display = "block";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error en el login:', errorCode, errorMessage);
        });
}

const logout = async () => {
    signOut(auth);
}
