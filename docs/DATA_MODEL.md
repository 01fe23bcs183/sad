# Data Model Reference

<<<<<<< codex/create-mock-test-website-for-cuet-pg-psychology-aundf0
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
=======
The current implementation uses static JavaScript objects to mimic a backend. Replace these structures with API calls when integrating a database or headless CMS.

## Entities

### Mock Test (`tests`)
- `id`: Unique identifier (string)
- `name`: Display name
- `window`: Scheduled availability (string)
- `duration`: Duration string (e.g., `120 mins`)
- `status`: Lifecycle badge (`Draft`, `Scheduled`, `Published`)
- `registrations`: Number of learners registered
- `sectionBreakdown`: Array of question counts per section
- `recommendedMode`: Suggested exam mode (`full`, `weak`, `pyq`)

### Learner (`learners`)
- `id`: Unique identifier
- `name`: Full name
- `plan`: Subscription tier (`Starter`, `Pro`, `Ultimate`)
- `score`: Latest aggregate score
- `mentor`: Assigned mentor name

### Payment (`paymentHistory` & persisted events)
- `id`: Transaction identifier
- `date`: ISO date string
- `customer` / `plan`: Payer info and purchased tier
- `amount`: Integer amount in INR
- `status`: `Paid`, `Refunded`, or other states

### Attempt (`learnerAttempts`)
- `id`: Attempt identifier
- `mock`: Friendly name of the mock
- `date`: Attempt date
- `score`: Raw score
- `percentile`: Percentile achieved

### Schedule (`learnerSchedule`)
- `id`: Slot identifier
- `date`: ISO date string
- `time`: 24-hour time string
- `title`: Description for the event

### Resource (`learnerResources`)
- `id`: Resource identifier
- `title`: Display title
- `type`: Artifact type (PDF, deck, mindmap)
- `tag`: Topic classification

### Exam Paper (`examPaper`)
- `duration`: Duration in minutes
- `sections`: Array of exam sections
  - `id`: Section identifier
  - `title`: Section title
  - `questions`: Question array
    - `id`: Question identifier
    - `text`: Question stem
    - `options`: Multiple-choice options
    - `answer`: Zero-based index of correct option
    - `difficulty`: Difficulty label
    - `topic`: Macro topic (e.g., `Cognitive Processes`)
    - `chapter`: Fine-grained blueprint label
    - `source`: `Mock` or `PYQ`
    - `year`: Source year for PYQs (nullable)

### Weak Topic Insight (`weakTopicInsights`)
- `topic`: Topic flagged by AI heuristics
- `confidence`: Float probability (0-1)
- `probableQuestionType`: Expected pattern for upcoming assessments
- `recommendation`: Mentor-friendly remediation snippet

### Chapter Pool (`chapterPools`)
- `chapter`: Blueprint heading
- `averageScore`: Average learner performance percentage
- `suggestedWeight`: Recommended weightage (0-1)
- `recentPYQCount`: Number of recent PYQs touching this chapter

### PYQ Catalog (`pyqCatalog`)
- `id`: Identifier tied to archive question
- `year`: Source exam year
- `topic`: Associated topic
- `difficulty`: Difficulty estimate
- `source`: Publication reference (e.g., `CUET PG Main`)

## Persistence Layers

- **sessionStorage** – Stores OTP payloads with expiry metadata.
- **localStorage** – Persists theme selection, simulated payment events, weak-topic locks, learner blueprints, and exam mode payloads for the player.

Replace with secure server-side storage for production deployments.
>>>>>>> main
