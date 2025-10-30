# Environment Setup

The PsychePrep React client reads configuration exclusively from Vite environment variables. Create a local `.env` file (or `.env.local`/deployment-specific variants) by copying `.env.sample` and injecting your live credentials.

## Required variables

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Base HTTPS origin for the platform REST/GraphQL API. Used for learner dashboards and audit log fallbacks. |
| `VITE_AUTH_SERVICE_URL` | Endpoint that issues OTPs/tokens during authentication. This should point at your secure auth backend. |
| `VITE_MAIL_FROM_ADDRESS` | The verified email address (or sender ID) that dispatches OTP codes. |
| `VITE_PAYMENT_PUBLIC_KEY` | Publishable client key from Stripe/Razorpay/etc. Required for rendering checkout widgets. |

## Optional variables

| Variable | Purpose |
| --- | --- |
| `VITE_AUDIT_LOG_ENDPOINT` | Explicit webhook URL for exam incidents; defaults to `<API_BASE_URL>/audit-log` if omitted. |
| `VITE_MAIL_PROVIDER_KEY` | API key for SES, SendGrid, Mailgun, etc. The key is surfaced in UI metadata only—perform OTP sends on a backend service. |
| `VITE_OTP_EXPIRY_MINUTES` | Minutes before an OTP entry becomes invalid (defaults to 2). |
| `VITE_OTP_LENGTH` | Number of digits generated for OTP codes (defaults to 6). |
| `VITE_PAYMENT_WEBHOOK_SECRET` | Server-side webhook secret for reconciling payment events; stored here for convenience but should be injected only into secure environments. |
| `VITE_ANALYTICS_WRITE_KEY` | Segment/Amplitude key for client-side analytics streams. |
| `VITE_PROCTORING_SOCKET_URL` | Secure WebSocket endpoint for live proctoring telemetry. When configured, the exam monitor surfaces the connection target. |
| `VITE_INCIDENT_WEBHOOK_URL` | Dedicated webhook for incident beacons emitted by the proctoring hook. |
| `VITE_IP_LOOKUP_ENDPOINT` | Public IP resolver endpoint (defaults to `https://api64.ipify.org?format=json`). |
| `VITE_SESSION_TTL_MINUTES` | Minutes until cached browser sessions expire and require re-authentication (defaults to 180). |
| `VITE_IP_LOCK_MINUTES` | Duration an IP lock remains active before the proctoring hook automatically releases it (defaults to 180). |
| `VITE_HEARTBEAT_ENDPOINT` | API endpoint that records periodic keep-alive beacons from the exam client. |
| `VITE_HEARTBEAT_INTERVAL_SECONDS` | Seconds between heartbeat transmissions (defaults to 45). |
| `VITE_SCREENSHOT_WEBHOOK` | Optional webhook that receives alerts when screenshot keys are pressed. |
| `VITE_DEVICE_FINGERPRINT_SALT` | Static salt appended to the browser fingerprint hash to avoid collisions across deployments. |
| `VITE_DEVTOOLS_SENSITIVITY` | Pixel threshold used to detect devtools docking/open events. |
| `VITE_REQUIRE_CAMERA` | Boolean flag (true/false) toggling camera verification at exam launch. |
| `VITE_GEOFENCE_LAT` / `VITE_GEOFENCE_LNG` | Latitude/longitude pair defining the allowed test centre. |
| `VITE_GEOFENCE_RADIUS_KM` | Radius in kilometres around the geofence origin that candidates must remain within. |

## Local development workflow

1. Copy `.env.sample` to `.env` and update the values.
2. Run `npm install` to fetch dependencies.
3. Start the dev server with `npm run dev`.
4. Whenever you change `.env`, restart Vite so it can reload the new values.

## Deployment notes

- Each environment (staging, production, exam rehearsal) should have its own `.env.*` file or CI/CD secret set.
- Never commit `.env` files containing live credentials. The provided `.gitignore` keeps local secrets out of version control.
- Inject only publishable keys (e.g., Stripe `pk_*`) into the client bundle. Keep secret keys on server infrastructure and proxy sensitive actions through secure APIs.
