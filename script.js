// script.js

import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ── Helper: format date ───────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric"
  });
}

// ── Helper: get initials from email ──────────────────────────
function getInitials(email, displayName) {
  if (displayName) {
    return displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  }
  return email ? email[0].toUpperCase() : "?";
}

// ── Helper: provider label ────────────────────────────────────
function getProvider(user) {
  if (!user.providerData || user.providerData.length === 0) return "Email";
  const id = user.providerData[0].providerId;
  const map = {
    "password":   "Email / Password",
    "google.com": "Google",
    "github.com": "GitHub",
  };
  return map[id] || id;
}

// ── Populate dashboard fields ─────────────────────────────────
function populateDashboard(user) {
  // Avatar initials
  const initials = getInitials(user.email, user.displayName);
  document.getElementById("dash-avatar").textContent = initials;

  // Name & email
  document.getElementById("dash-name").textContent =
    user.displayName || user.email.split("@")[0];
  document.getElementById("dash-email").textContent = user.email;

  // Info cards
  document.getElementById("info-uid").textContent =
    user.uid.slice(0, 16) + "…";
  document.getElementById("info-provider").textContent =
    getProvider(user);
  document.getElementById("info-created").textContent =
    formatDate(user.metadata.creationTime);
  document.getElementById("info-lastlogin").textContent =
    formatDate(user.metadata.lastSignInTime);

  // Verification status
  const verifiedEl = document.getElementById("info-verified");
  if (user.emailVerified) {
    verifiedEl.innerHTML = `<span style="color:var(--success)">✓ Email verified</span>`;
  } else {
    verifiedEl.innerHTML = `<span style="color:var(--accent)">⚠ Email not verified</span>`;
  }
}

// ── Auth state listener ───────────────────────────────────────
onAuthStateChanged(auth, (user) => {
  if (user) {
    populateDashboard(user);
  } else {
    // Not logged in — redirect to auth page
    window.location.href = "index.html";
  }
});

// ── Logout ────────────────────────────────────────────────────
document.getElementById("logout-btn").addEventListener("click", async () => {
  const btn = document.getElementById("logout-btn");
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner" style="border-color:rgba(248,113,113,.3);border-top-color:var(--danger)"></span> Signing out…`;

  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout error:", error.message);
    btn.disabled = false;
    btn.innerHTML = `Logout`;
  }
});