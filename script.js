// script.js

import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ── Helpers ───────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric"
  });
}

function getInitials(email, displayName) {
  if (displayName) return displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return email ? email[0].toUpperCase() : "?";
}

function getProvider(user) {
  if (!user.providerData || user.providerData.length === 0) return "Email";
  const map = {
    "password":   "Email / Password",
    "google.com": "Google",
    "github.com": "GitHub"
  };
  return map[user.providerData[0].providerId] || user.providerData[0].providerId;
}

// ── Populate dashboard ────────────────────────────────────────
function populateDashboard(user) {
  document.getElementById("dash-avatar").textContent    = getInitials(user.email, user.displayName);
  document.getElementById("dash-name").textContent      = user.displayName || user.email.split("@")[0];
  document.getElementById("dash-email").textContent     = user.email;
  document.getElementById("info-uid").textContent       = user.uid.slice(0, 16) + "…";
  document.getElementById("info-provider").textContent  = getProvider(user);
  document.getElementById("info-created").textContent   = formatDate(user.metadata.creationTime);
  document.getElementById("info-lastlogin").textContent = formatDate(user.metadata.lastSignInTime);

  // Show whitelist status instead of email verification
  const verifiedEl = document.getElementById("info-verified");
  verifiedEl.innerHTML = `<span style="color:var(--success)">✓ Whitelisted user</span>`;
}

// ── Auth state ────────────────────────────────────────────────
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  populateDashboard(user);
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
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Logout`;
  }
});

// © 2026 Hassan Javed.
// This repository is publicly viewable for learning purposes.
// Re-uploading or presenting it as your own work is not permitted.