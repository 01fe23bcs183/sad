# PsychePrep Platform Overview

<<<<<<< codex/create-mock-test-website-for-cuet-pg-psychology-aundf0
PsychePrep is a React-powered CUET PG Psychology preparation environment. The app fuses an immersive marketing site, OTP-gated authentication, AI-assisted dashboards, and an NTA-inspired exam cockpit with integrated proctoring guardrails.

## Key Modules

- **Landing Experience (`src/pages/LandingPage.jsx`)** – marketing copy, marquee highlights, journey timeline, testimonials, and pricing cards animated with Framer Motion.
- **Authentication (`src/pages/LoginPage.jsx`)** – two-step OTP flow backed by `Map` storage in context with resend, error states, and role-aware routing.
- **Learner Dashboard (`src/pages/UserDashboardPage.jsx`)** – adaptive booster launcher, mastery radar, weak-topic guesser, custom mix builder, PYQ sprint, and recent activity timeline.
- **Admin Dashboard (`src/pages/AdminDashboardPage.jsx`)** – operations overview, cohort insights, blueprint intelligence, payment telemetry, and an integrity control centre with live escalations.
- **Exam Player (`src/pages/ExamPage.jsx`)** – Vite-served assessment surface with blueprint metadata, response capture, flagging, timers, and a comprehensive proctoring console.

## Technical Highlights

- **Global Context (`src/context/AppContext.jsx`)** – centralises theme, session, OTP, and dataset access. Session persistence uses `sessionStorage` with lockdown flags and IP locking.
- **Security Hooks (`src/hooks/useExamSecurity.js`)** – encapsulates fullscreen enforcement, focus/offline monitoring, shortcut suppression, IP verification, geo-fencing, camera validation, heartbeat telemetry, and incident callbacks.
- **Motion & Styling** – Tailwind CSS powers rapid theming while Framer Motion wraps route transitions. `src/styles/theme.css` defines Nebula/Aurora palettes.
- **Data Layer (`src/data/mockData.js`)** – realistic learners, exams, weak-topic signals, and security telemetry keep the UI hydrated without external services.

## Limitations & Next Steps

- OTP issuance is console-backed; integrate AWS SES, SendGrid, or Twilio for production.
- Payment hooks are copy-only; wire Stripe/Razorpay SDKs with webhook verification and invoicing.
- Exam content is mocked; connect to a question bank API and persist attempts server-side.
- Client-only proctoring should be paired with backend attestation, device fingerprinting, and webcam/AI invigilation streams for high-stakes runs.
- Add E2E tests (Playwright/Cypress) to assert flow integrity before go-live.

Refer to the deployment and data model guides for environment-specific recommendations.
=======
PsychePrep is a client-side prototype of a CUET PG Psychology mock test ecosystem. The repository bundles responsive landing pages, a lean OTP-based access flow, learner and admin dashboards, and an NTA-style exam engine. All functionality is implemented with vanilla HTML, CSS, and JavaScript to remain dependency-free within restricted environments.

## Key Modules

- **Landing Experience (`index.html`)** – marketing copy, feature highlights, theme toggle, and pricing cards that connect to simulated payments.
- **Authentication (`login.html`)** – OTP workflow backed by `sessionStorage` with a 5-minute expiry window, multi-role routing, and toast notifications.
- **Admin Dashboard (`admin.html`)** – metrics board, mock pipeline, learner roster, AI weak topic console, blueprint analytics, PYQ vault, and billing tables sourced from mock data.
- **Learner Dashboard (`user.html`)** – recent attempts, schedule, curated resources, weak topic AI, custom chapter blender, PYQ vault, and payment history merged with persisted sandbox transactions.
- **Exam Player (`exam.html`)** – timer-driven assessment experience matching NTA patterns (question palette, flagged states, review workflow, notepad) with adaptive weak-topic, PYQ-only, learner blueprint modes, and client-side proctoring enforcement.

## Technical Highlights

- **Theme Engine** – `assets/js/theme.js` centralizes light/dark theme state with graceful fallbacks and localStorage persistence.
- **OTP & Session Security** – `assets/js/otp.js` generates and validates OTP tokens while logging to the console for testing. Production deployments must replace this with an email/SMS provider.
- **Payment Sandbox** – `assets/js/payment.js` mimics gateway callbacks and persists transactions locally to unblock UI flows and analytics.
- **Exam Logic & Proctoring** – `assets/js/exam.js` flattens section/question structures, tracks attempts, enforces timers, honours stored mode payloads (weak focus, PYQ, custom mix), and now adds fullscreen enforcement, focus/network audits, shortcut suppression, and per-device session locks.
- **AI Surface** – `assets/js/data.js`, `assets/js/user.js`, and `assets/js/admin.js` collaborate on a weak-topic guesser, chapter weight recommendations, and PYQ intelligence cards wired through `localStorage` payloads for exam handoff.

## Limitations & Next Steps

- No server-side stack is bundled. Integrate a backend to persist users, attempts, and payments securely.
- Email delivery is simulated; wire OTP issuance to services like AWS SES, SendGrid, or Twilio.
- Payment gateway APIs (Razorpay/Stripe) need server-side verification endpoints before production.
- Add accessibility audits (ARIA landmarks, focus traps) and offline-first packaging.
- Replace client-only integrity checks with authenticated APIs that can validate device/IP fingerprints, webcam proctoring, and live invigilator dashboards.

For deployment, refer to `docs/DEPLOYMENT.md`. Data structures are documented in `docs/DATA_MODEL.md`.
>>>>>>> main
