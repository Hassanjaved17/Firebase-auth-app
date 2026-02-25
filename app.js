import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Signup
document.getElementById("signup-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created:", userCredential.user);
      alert("Signup successful! Redirecting to dashboard...");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });
});

// Login
document.getElementById("login-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
      alert("Login successful! Redirecting to dashboard...");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });
});

// Google Sign-In
const googleBtn = document.getElementById("google-btn");

googleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error(error.message);
      alert(error.message);
    });
});