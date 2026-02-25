import { auth } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
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