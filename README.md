<<<<<<< codex/create-mock-test-website-for-cuet-pg-psychology-aundf0
# PsychePrep – CUET PG Psychology Platform

PsychePrep is a premium CUET PG Psychology preparation experience built with React, Vite, Tailwind CSS, and Framer Motion. It delivers a polished landing presence, OTP-secured authentication, AI-infused learner and admin dashboards, and an exam cockpit hardened with client-side proctoring controls.

## Features

- 🌌 **Dual Visual Themes** – Nebula (default) and Aurora palettes with persistent selection and contextual gradients.
- 🔐 **OTP Authentication Flow** – Console-backed 6-digit OTP issuance/validation that routes learners and admins to dedicated workspaces.
- 🎯 **Learner Intelligence** – Weak-topic AI guesser, custom blueprint builder, PYQ sprints, mastery radar, and adaptive booster launchpads.
- 🧠 **Admin Command Center** – Cohort health, blueprint intelligence, payment telemetry, and incident heatmaps in a cinematic dashboard shell.
- 🧪 **Exam Engine** – NTA-inspired player with blueprint-aware question rendering, response capture, flagging, timers, and polished UX micro-interactions.
- 🛡️ **Proctoring Guardrails** – Fullscreen enforcement, focus/network/IP monitoring, shortcut suppression, screenshot and devtools detection, camera/geo validation, and lockdown escalation.
- 🛰️ **Integrity Control Centre** – Heartbeat telemetry, geofence compliance, fingerprinting, and live escalation feed surfaced to admins and invigilators.
- 💳 **Payment-ready Copy** – Stripe/Razorpay-ready callouts and GST reporting affordances for enterprise alignment.
- 📚 **Documentation Suite** – Platform overview, deployment guide, and data model notes aligned to the React architecture.

## Tech Stack

- React 18 with functional components and hooks
- Vite for lightning-fast dev/build workflows
- Tailwind CSS + custom theme tokens
- Framer Motion for animated page transitions
- Date-fns, clsx, and modern utility helpers

## Getting Started

1. Duplicate the sample environment file and populate secrets:

   ```bash
   cp .env.sample .env
   ```

   Update the copied file with your API base URL, OTP/mail provider keys, payment gateway credentials, and proctoring endpoints. See [Environment Setup](docs/ENVIRONMENT_SETUP.md) for variable descriptions.

2. Install dependencies and start the Vite dev server:

   ```bash
   npm install
   npm run dev
   ```

The dev server boots at `http://localhost:5173` and loads the environment values provided in `.env`.

### Production Build

```bash
npm run build
npm run preview
```

## Key Directories

```
src/
  components/      # Landing, dashboard, and exam atoms & organisms
  context/         # Global app state (session, theme, OTP, data)
  data/            # Mock learners, exams, weak-topic, and security telemetry
  hooks/           # Proctoring, countdown, and integrity enforcement hooks
  layouts/         # Shell, auth guard, and navigation
  pages/           # Route-level screens
  styles/          # Theme variables and global treatments
```

## Testing Checklist

- Run `npm run build` before shipping.
- Validate OTP flow in the browser (OTP logged to console).
- Confirm proctoring monitor responds to fullscreen, focus, network, camera, and geofence changes.
- Verify admin dashboard widgets for payment, cohort, blueprint telemetry, and the integrity control centre render correctly.
=======
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
>>>>>>> main

## Documentation

- [Platform Overview](docs/PLATFORM_OVERVIEW.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Data Model Reference](docs/DATA_MODEL.md)
<<<<<<< codex/create-mock-test-website-for-cuet-pg-psychology-aundf0
- [Environment Setup](docs/ENVIRONMENT_SETUP.md)

## License

This repository is provided for educational and demonstration purposes. Integrations with production authentication, proctoring, and payment services must respect provider terms of use and privacy regulations.
=======

## License

This repository is provided for educational and demonstration purposes. Integrations with live OTP and payment services must respect the providers' terms of use and data protection regulations.
>>>>>>> main
