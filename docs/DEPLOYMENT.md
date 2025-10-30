# Deployment Guide

<<<<<<< codex/create-mock-test-website-for-cuet-pg-psychology-aundf0
PsychePrep is a React + Vite single-page application that ships as static assets after bundling. Follow the steps below to publish the platform.

## 1. Install & Build

```bash
npm install
npm run build
```

The build command outputs an optimised bundle in `dist/`.

## 2. Host Providers

1. **Netlify**
   - Deploy via Git or drag-and-drop the `dist/` folder.
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Vercel**
   - Import the repository and choose the Vite preset.
   - Build command: `npm run build`
   - Output directory: `dist`

3. **GitHub Pages**
   - Run `npm run build` locally and push the contents of `dist/` to a `gh-pages` branch.
   - Or use an action such as `peaceiris/actions-gh-pages` to automate deployments.

## 3. Environment Variables

Copy `.env.sample` to `.env` (or environment-specific variants) and provide the credentials listed in [Environment Setup](ENVIRONMENT_SETUP.md). At a minimum set:

- `VITE_API_BASE_URL` and `VITE_AUTH_SERVICE_URL` to point at your backend services.
- `VITE_MAIL_FROM_ADDRESS` and `VITE_MAIL_PROVIDER_KEY` for OTP delivery.
- `VITE_PAYMENT_PUBLIC_KEY` (and webhook secrets on the server) for checkout integration.
- Proctoring endpoints such as `VITE_PROCTORING_SOCKET_URL`/`VITE_INCIDENT_WEBHOOK_URL` to capture exam incidents.
- Heartbeat and lockdown automation endpoints: `VITE_HEARTBEAT_ENDPOINT`, `VITE_SCREENSHOT_WEBHOOK`, and geofence coordinates (`VITE_GEOFENCE_LAT`, `VITE_GEOFENCE_LNG`, `VITE_GEOFENCE_RADIUS_KM`).

Keep private keys server-side—only expose publishable credentials to the client bundle.

## 4. Hardening Checklist

- Enforce HTTPS and appropriate security headers (CSP, X-Frame-Options, Referrer-Policy).
- Terminate OTP and payment flows on secure backend services before production.
- Persist learner, admin, and exam artefacts in managed databases with role-based access.
- Pair the client proctoring hook with backend attestation, verified device fingerprint registries, and real invigilation streams.
- Monitor heartbeat intake endpoints and geofence violations to trigger rapid-response workflows.
- Add monitoring (Sentry, Datadog) and synthetic checks for exam uptime.

## 5. Local Preview

After running `npm run build`, preview the static output:

```bash
npm run preview
```

The preview server hosts the `dist/` bundle at `http://localhost:4173`.
=======
This repository is dependency-free and can be hosted on any static hosting provider such as GitHub Pages, Netlify, or Vercel. Follow the steps below to publish PsychePrep.

## 1. Build Artifacts

The project ships with pre-built HTML/CSS/JS assets. No bundling or transpilation is required. Ensure that the directory structure is preserved during deployment.

```
/
├── assets/
│   ├── css/
│   └── js/
├── docs/
├── admin.html
├── exam.html
├── index.html
├── login.html
└── user.html
```

## 2. Configure Hosting

1. **GitHub Pages**
   - Push the repository to GitHub.
   - Enable GitHub Pages for the `main` branch.
   - Set the custom domain (optional) and enforce HTTPS.

2. **Netlify**
   - Drag and drop the repository folder into the Netlify dashboard _or_ connect via Git.
   - Build command: `none`
   - Publish directory: `/`

3. **Vercel**
   - Import the Git repository.
   - Framework preset: `Other`.
   - Build and output settings left empty.

## 3. Environment Variables

The prototype does not require environment variables. When integrating real services, add the following typical values:

- `NEXT_PUBLIC_STRIPE_KEY`, `STRIPE_SECRET_KEY` – Stripe payments (server & client).
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` – Razorpay integration.
- `SENDGRID_API_KEY` – Email OTP delivery.

Ensure that private keys remain on server-side infrastructure.

## 4. Hardening Checklist

- Serve the app behind HTTPS.
- Add HTTP security headers (Content Security Policy, X-Frame-Options) if proxied through a backend.
- Integrate service worker caching for offline resilience.
- Implement backend APIs for OTP issuance, payment verification, and exam submission before production release.
- Replace heuristic weak-topic, blueprint, and PYQ datasets with secured analytics APIs or scheduled ETL pipelines.
- Back exam attempts with authenticated APIs that can validate IP/device fingerprints, maintain session leases, and stream proctoring signals to invigilators.

## 5. Local Preview

Open `index.html` directly in a browser or serve the folder with any static server:

```bash
python -m http.server 3000
```

Navigate to `http://localhost:3000` to explore the experience.
>>>>>>> main
