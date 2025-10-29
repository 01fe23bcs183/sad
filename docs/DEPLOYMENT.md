# Deployment Guide

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
