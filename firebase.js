import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDh9aNB-6RkYZfRgzhfW1m8nLbSZGdUVds",
  authDomain: "fir-auth-app-6e2c7.firebaseapp.com",
  projectId: "fir-auth-app-6e2c7",
  storageBucket: "fir-auth-app-6e2c7.firebasestorage.app",
  messagingSenderId: "896381544054",
  appId: "1:896381544054:web:5274cdb3ed864b507aa157",
  measurementId: "G-SJK9YKXZTS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// © 2026 Hassan Javed.
// This repository is publicly viewable for learning purposes.
// Re-uploading or presenting it as your own work is not permitted.

