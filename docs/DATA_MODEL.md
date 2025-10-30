# Data Model Reference

The current build uses static JavaScript structures to simulate a backend. Wire these interfaces to an API or database when productionising the platform.

## Entities

### Learner (`learners` in `src/data/mockData.js`)
- `id`: Unique identifier
- `name`: Full name
- `email`: Login address
- `plan`: Subscription tier (e.g., `Astra Elite`)
- `role`: `learner`
- `streak`: Consecutive active days
- `mastery`: Aggregate mastery percentage
- `recommendations`: Array of suggested focus topics

### Exam Blueprint (`mockExams`)
- `id`: Unique identifier
- `title`: Friendly display name
- `duration`: Duration in minutes
- `totalQuestions`: Total item count
- `mode`: `adaptive`, `pyq`, `custom`, etc.
- `locked`: Boolean for admin lock
- `blueprint`: Object mapping macro domains to question counts

### Weak Topic Signal (`weakTopicSignals`)
- `topic`: Topic flagged by AI heuristics
- `confidence`: Float probability (0-1)
- `recommendedResources`: Array of remediation artefacts

### Session (`session` in context)
- `user`: Authenticated user payload (learner or admin)
- `issuedAt`: Epoch timestamp for login time
- `lockdown`: Boolean indicating proctoring lock
- `ipLock`: Captured IP for exam session enforcement

### Incident (`incidents` state)
- `code`: Enum (`EXIT_FULLSCREEN`, `VISIBILITY_CHANGE`, `NETWORK_DROP`, `SHORTCUT`, `IP_CONFLICT`, `CONTEXT_MENU`, `CLIPBOARD_INTERACTION`, `WINDOW_RESIZE`, `DEVTOOLS_DETECTED`, `GEOFENCE_BREACH`, `CAMERA_BLOCKED`, `BEFORE_UNLOAD`, `HEARTBEAT_FAILURE`, `SCREENSHOT_ATTEMPT`)
- `meta`: Optional metadata (e.g., clipboard event type, resize dimensions, geofence distance)
- `timestamp`: Epoch milliseconds when recorded

### Security Telemetry (`securityTelemetry`)
- `incidentsToday`: Count of incidents captured in the current UTC day
- `autoLockdowns`: Number of auto-lockdowns triggered by the proctoring engine
- `averageHeartbeatLatency`: String summary of latest heartbeat latency
- `geoFenceAlerts`: Count of venue breaches detected
- `ipVariance`: Percentage variance between expected and observed IPs
- `lastSync`: Human-readable timestamp for the last telemetry refresh

### Security Feed (`securityFeed`)
- `id`: Unique identifier for the escalated event
- `candidate`: Candidate display name
- `code`: Incident code that triggered the alert
- `status`: Review status badge (e.g., `Escalated`, `Cleared`)
- `timestamp`: Localised timestamp for the alert capture

### OTP Store (`otpStore` Map)
- `otp`: Generated 6-digit code
- `expires`: Expiry timestamp (ms)

## Persistence Layers

- **localStorage** – Stores theme selection.
- **sessionStorage** – Persists authenticated session payloads between reloads.
- **In-memory Maps/Arrays** – Hold OTP tokens, learners, exams, weak-topic signals, and security telemetry for demo purposes.

Replace these mocks with secure server-side storage and APIs when integrating real data sources.
