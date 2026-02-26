// app.js

import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ============================================================
// WHITELIST — add allowed emails here
// ============================================================
const WHITELISTED_EMAILS = [
  "hassan@gmail.com",
  "admin@gmail.com",
  "hassandeveloper341@gmail.com",
  "hassanaptech9@gmail.com",
  "ibrahimkhan@gmail.com",
  "devhassan65@gmail.com",
  // add more emails here...
];

function isWhitelisted(email) {
  return WHITELISTED_EMAILS.includes(email.trim().toLowerCase());
}

// ============================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================
function showToast(message, type = "info") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;

  const icons = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };

  toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("toast--show"));

  setTimeout(() => {
    toast.classList.remove("toast--show");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, 4000);
}

// ============================================================
// LOADING STATE HELPERS
// ============================================================
function setLoading(btn, isLoading) {
  if (isLoading) {
    btn.disabled = true;
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = `<span class="spinner"></span> Loading...`;
  } else {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
  }
}

// ============================================================
// INLINE ERROR HELPERS
// ============================================================
function setInputError(inputId, message) {
  clearInputError(inputId);
  const input = document.getElementById(inputId);
  input.classList.add("input--error");
  const err = document.createElement("span");
  err.className = "input-error-msg";
  err.textContent = message;
  input.insertAdjacentElement("afterend", err);
}

function clearInputError(inputId) {
  const input = document.getElementById(inputId);
  input.classList.remove("input--error");
  const msg = input.nextElementSibling;
  if (msg && msg.classList.contains("input-error-msg")) msg.remove();
}

function clearAllErrors(prefix) {
  clearInputError(`${prefix}-email`);
  clearInputError(`${prefix}-password`);
}

// ============================================================
// FIREBASE ERROR → HUMAN-READABLE MESSAGE
// ============================================================
function friendlyError(code) {
  const map = {
    "auth/email-already-in-use":   "That email is already registered.",
    "auth/invalid-email":          "Please enter a valid email address.",
    "auth/weak-password":          "Password must be at least 6 characters.",
    "auth/user-not-found":         "No account found with that email.",
    "auth/wrong-password":         "Incorrect password. Try again.",
    "auth/invalid-credential":     "Incorrect email or password.",
    "auth/too-many-requests":      "Too many attempts. Try again later.",
    "auth/popup-closed-by-user":   "Google sign-in was cancelled.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

// ============================================================
// SIGNUP — only runs on index.html
// ============================================================
const signupForm = document.getElementById("signup-form");
if (signupForm) signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAllErrors("signup");

  const email    = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const btn      = document.getElementById("signup-btn");

  if (!email)              return setInputError("signup-email", "Email is required.");
  if (!password)           return setInputError("signup-password", "Password is required.");
  if (password.length < 6) return setInputError("signup-password", "Minimum 6 characters.");

  if (!isWhitelisted(email)) {
    setInputError("signup-email", "This email is not authorized to sign up.");
    showToast("Access denied — email not on the whitelist.", "error");
    return;
  }

  setLoading(btn, true);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User created:", userCredential.user);
    showToast("Account created! Redirecting...", "success");
    setTimeout(() => { window.location.href = "dashboard.html"; }, 1200);
  } catch (error) {
    console.error("Signup error:", error.code);
    const msg = friendlyError(error.code);
    setInputError("signup-email", msg);
    showToast(msg, "error");
    setLoading(btn, false);
  }
});

// ============================================================
// LOGIN — only runs on index.html
// ============================================================
const loginForm = document.getElementById("login-form");
if (loginForm) loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAllErrors("login");

  const email    = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const btn      = document.getElementById("login-btn");

  if (!email)    return setInputError("login-email", "Email is required.");
  if (!password) return setInputError("login-password", "Password is required.");

  if (!isWhitelisted(email)) {
    setInputError("login-email", "This email is not authorized.");
    showToast("Access denied — email not on the whitelist.", "error");
    return;
  }

  setLoading(btn, true);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    showToast("Welcome back! Redirecting...", "success");
    setTimeout(() => { window.location.href = "dashboard.html"; }, 1200);
  } catch (error) {
    console.error("Login error:", error.code);
    const msg = friendlyError(error.code);
    setInputError("login-password", msg);
    showToast(msg, "error");
    setLoading(btn, false);
  }
});

// ============================================================
// GOOGLE SIGN-IN — only runs on index.html
// ============================================================
const googleBtn = document.getElementById("google-btn");
if (googleBtn) googleBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const btn      = document.getElementById("google-btn");
  const provider = new GoogleAuthProvider();

  setLoading(btn, true);

  try {
    const result = await signInWithPopup(auth, provider);
    const email  = result.user.email;

    if (!isWhitelisted(email)) {
      await deleteUser(result.user);
      showToast(`${email} is not authorized to access this app.`, "error");
      setLoading(btn, false);
      return;
    }

    showToast("Signed in with Google! Redirecting...", "success");
    setTimeout(() => { window.location.href = "dashboard.html"; }, 1200);
  } catch (error) {
    console.error("Google error:", error.code);
    showToast(friendlyError(error.code), "error");
    setLoading(btn, false);
  }
});

// ============================================================
// PASSWORD RESET — only runs on reset.html
// ============================================================
const resetForm = document.getElementById("reset-form");
if (resetForm) {
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("reset-email").value.trim();
    const btn   = document.getElementById("reset-btn");

    if (!email) return setInputError("reset-email", "Email is required.");

    setLoading(btn, true);

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      // Silently ignore — prevents email enumeration
      console.error("Reset error:", error.code);
    } finally {
      // Always show success regardless (security best practice)
      document.getElementById("reset-form-wrap").style.display = "none";
      document.getElementById("reset-success").style.display   = "flex";
    }
  });
}