const phases = [
  {
    title: 'Immersive onboarding',
    description: 'Biometric profile capture, psych-map baseline, and curated journey initialization within 8 minutes.'
  },
  {
    title: 'Accelerated mastery loops',
    description: 'Weak-topic rescue labs, spaced retrieval sprints, and AI-led reflection diaries to sustain growth.'
  },
  {
    title: 'Exam command center',
    description: 'NTA-grade simulator with IP locks, incident guardrails, and live telemetry for invigilators.'
  },
  {
    title: 'Post-exam analytics',
    description: 'Deep dive dashboards, payment reconciliation, and cohort-level intelligence for the next sprint.'
  }
];

const JourneyTimeline = () => (
  <section className="rounded-3xl border border-white/5 bg-surface-card/50 p-10 backdrop-blur">
    <h2 className="text-3xl font-semibold text-white">Your PsychePrep flight path</h2>
    <div className="mt-8 grid gap-10 md:grid-cols-4">
      {phases.map((phase, index) => (
        <div key={phase.title} className="space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white/70">
            0{index + 1}
          </div>
          <h3 className="text-xl font-semibold text-white">{phase.title}</h3>
          <p className="text-sm text-white/60">{phase.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default JourneyTimeline;
