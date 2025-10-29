# PsychePrep – CUET PG Psychology Mock Suite

PsychePrep is a fully responsive, theme-aware prototype for running CUET PG Psychology mock examinations. It ships with landing pages, OTP-gated access, learner and admin dashboards, and an NTA-inspired exam player—all built with vanilla HTML, CSS, and JavaScript for ease of deployment.

## Features

- 🌗 **Dual Theme Engine** – Light and dark themes with persistent storage.
- 🔐 **Email OTP Simulation** – 6-digit OTP workflow with session expiry and role-based routing.
- 🧭 **Learner Dashboard** – Attempts table, mentoring schedule, curated resources, weak topic AI, custom mix builder, and payment history.
- 🗂️ **Admin Console** – Metrics, mock test pipeline management, learner roster, AI weak topic board, blueprint analytics, and billing overview.
- 🧪 **Exam Interface** – NTA-style question palette, timer, mark-for-review flow, adaptive modes (weak focus, PYQ only, custom mix), and score computation.
- 🛡️ **Proctoring & Integrity** – Fullscreen enforcement, single-session locking, focus/offline monitoring, shortcut suppression, and incident logging with examiner alerts.
- 📚 **PYQ Intelligence** – Filterable past-year archive with instant exam handoff and mentor-ready insights.
- 💳 **Payment Sandbox** – Simulated checkout and transaction persistence for plan upgrades.

## Getting Started

1. Clone the repository and open `index.html` in your browser.
2. Use the `Login` button to access the OTP gateway. Generated OTPs are logged to the console for testing.
3. Explore the learner (`user.html`) and admin (`admin.html`) dashboards, or launch `exam.html` for the exam simulator.

## Directory Structure

```
assets/
  css/      # Base, landing, dashboard, and exam stylesheets
  js/       # Theme, OTP, payment, and page-specific modules
docs/
  DATA_MODEL.md
  DEPLOYMENT.md
  PLATFORM_OVERVIEW.md
index.html
login.html
admin.html
user.html
exam.html
```

## Extending the Prototype

- Replace mock data in `assets/js/data.js` with REST or GraphQL API calls.
- Connect `assets/js/otp.js` to a mail/SMS service (SendGrid, SES, Twilio).
- Wire payment flows in `assets/js/payment.js` to a gateway webhook (Razorpay, Stripe) and persist results server-side.
- Harden the exam engine by integrating user authentication, IP/device validation, remote proctoring feeds, and server-backed attempt lifecycle management.

## Documentation

- [Platform Overview](docs/PLATFORM_OVERVIEW.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Data Model Reference](docs/DATA_MODEL.md)

## License

This repository is provided for educational and demonstration purposes. Integrations with live OTP and payment services must respect the providers' terms of use and data protection regulations.
