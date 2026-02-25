import { auth } from "./firebase.js"; // ✅ import initialized auth
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Check if user is signed in
onAuthStateChanged(auth, (user) => {
  const div = document.getElementById("user-info");
  if (user) {
    div.innerHTML = `
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>UID:</strong> ${user.uid}</p>
      <p><strong>Created At:</strong> ${new Date(user.metadata.creationTime).toLocaleString()}</p>
      <p><strong>Last Sign In:</strong> ${new Date(user.metadata.lastSignInTime).toLocaleString()}</p>
    `;
  } else {
    div.innerHTML = "No user signed in. Redirecting...";
    setTimeout(() => window.location.href = "index.html", 1500);
  }
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});