# Data Model Reference

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
