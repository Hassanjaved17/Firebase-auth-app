// app.js

import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ── Signup ──────────────────────────────────────────────────
document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email    = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created:", userCredential.user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Signup error:", error.message);
      alert(error.message);
    });
});

// ── Login ───────────────────────────────────────────────────
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email    = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert(error.message);
    });
});

// ── Google Sign-In ──────────────────────────────────────────
document.getElementById("google-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Google sign-in:", result.user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Google error:", error.message);
      alert(error.message);
    });
});