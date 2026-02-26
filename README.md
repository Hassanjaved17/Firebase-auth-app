<div align="center">

# 🔐 Firebase Auth App

**A sleek, production-ready authentication system built with vanilla JavaScript and Firebase.**

[![Firebase](https://img.shields.io/badge/Firebase-10.12.2-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Features](#-features) · [Screenshots](#-screenshots) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Firebase Setup](#-firebase-setup)

</div>

---

## ✨ Features

- 🔑 &nbsp;**Email & Password** — Signup and login with full client-side validation
- 🌐 &nbsp;**Google OAuth** — One-click sign-in with Google via Firebase popup
- 🔒 &nbsp;**Whitelist Access Control** — Only pre-approved emails can access the app
- 🔁 &nbsp;**Password Reset** — Sends a reset link directly to the user's inbox
- 📊 &nbsp;**User Dashboard** — Displays UID, provider, join date, last login and more
- 🍞 &nbsp;**Toast Notifications** — Smooth slide-up feedback for every action
- ⏳ &nbsp;**Loading States** — Spinners on all buttons during async operations
- 🚨 &nbsp;**Inline Error Messages** — Human-readable errors under each input field
- 📱 &nbsp;**Fully Responsive** — Works cleanly on all screen sizes
- 🎨 &nbsp;**Dark Glass UI** — Amber-accented glassmorphism design

---

## 🗂 Project Structure

```
firebase-auth-app/
│
├── index.html          # Signup + Login page
├── dashboard.html      # Protected user dashboard
├── reset.html          # Password reset page
│
├── app.js              # Auth logic (signup, login, Google, reset)
├── script.js           # Dashboard logic (populate user info, logout)
├── firebase.js         # Firebase app initialization & config
│
├── style.css           # Shared styles for all pages
│
└── images/
    └── favicon.png
```

---

## 🔥 Firebase Setup

**1. Create a Firebase project**

Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**

**2. Enable Authentication providers**

Navigate to **Authentication → Sign-in method** and enable:
- ✅ Email/Password
- ✅ Google

**3. Add your Firebase config**

Create `firebase.js` in the root with your project credentials:

```js
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

**4. Add allowed emails to the whitelist**

Open `app.js` and update the array at the top:

```js
const WHITELISTED_EMAILS = [
  "you@gmail.com",
  "teammate@gmail.com",
  // add more here...
];
```

Only emails in this list can sign up or log in — everyone else is blocked.

---

## 🚀 Getting Started

No build tools or package managers needed. Just open in a browser.

```bash
# Clone the repo
git clone https://github.com/Hassanjaved17/Firebase-auth-app.git

# Navigate into it
cd Firebase-auth-app

# Add your firebase.js config (see above)
# Then open with Live Server or any static server
```

> ⚠️ Firebase modules use ES module imports — you must serve the files over HTTP (e.g. with VS Code **Live Server**), not open them directly as `file://` in the browser.

---

## 🔐 Auth Flow

```
┌─────────────────────────────────────────────────┐
│                   index.html                    │
│                                                 │
│  ┌──────────┐   ┌──────────┐   ┌─────────────┐ │
│  │  Sign Up │   │  Log In  │   │Google OAuth │ │
│  └────┬─────┘   └────┬─────┘   └──────┬──────┘ │
│       │              │                │        │
│  Whitelist      Whitelist        Whitelist     │
│   Check ✓        Check ✓          Check ✓      │
└───────┼──────────────┼────────────────┼────────┘
        │              │                │
        └──────────────▼────────────────┘
                       │
                 dashboard.html
                  (protected)
                       │
              Not logged in?
                       │
                  index.html
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Firebase Auth 10.12.2** | Authentication backend |
| **Vanilla JavaScript (ES Modules)** | All logic, zero frameworks |
| **HTML5** | Semantic page structure |
| **CSS3** | Glassmorphism UI, animations, responsive layout |
| **Google Fonts** | DM Serif Display + DM Sans |

---

## 📄 Pages

| Page | File | Description |
|---|---|---|
| Auth | `index.html` | Signup, Login, Google Sign-In |
| Dashboard | `dashboard.html` | User info, session details, logout |
| Reset | `reset.html` | Send password reset email |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **[Hassan Javed](https://github.com/Hassanjaved17)**

⭐ Star this repo if you found it useful!

</div>
