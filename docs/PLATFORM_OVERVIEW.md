# PsychePrep Platform Overview

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
