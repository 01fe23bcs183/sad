const features = [
  {
    title: 'Dynamic weak-topic rescuer',
    description: 'AI-guided detection with neural drift charts, micro-drills, and mastery recovery forecasting.',
    stats: ['Sub-5 min remediation plans', 'Confidence lift predictor', 'Neuro tagging of attempts']
  },
  {
    title: 'Custom blueprint architect',
    description: 'Blend chapters, difficulty, PYQs, and application layers into on-demand exam recipes.',
    stats: ['Drag-and-drop builder', 'PYQ percentile tuning', 'Auto-normalised scoring']
  },
  {
    title: 'Admin intelligence core',
    description: 'Command center for cohorts, payment health, incident heatmaps, and exam orchestration.',
    stats: ['Realtime invigilation feed', 'Payment anomaly alerts', 'Cohort drop-off radar']
  },
  {
    title: 'Full-spectrum proctoring',
    description: 'IP locks, fullscreen traps, biometric prompts, session forensics, and tamper-resistant logs.',
    stats: ['One-IP guarantee', 'AI posture scoring', 'Session DNA archive']
  }
];

const FeatureGrid = () => (
  <section className="space-y-10">
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold text-white">Engineered for the elite CUET cohort</h2>
      <p className="max-w-3xl text-white/70">
        We reverse engineered the NTA experience—making each module purposeful, from simulated server lag to biometric break approvals. Two visual themes, absolute security, and modular upgrades keep teams future-proof.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => (
        <article key={feature.title} className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 via-surface-card/60 to-black/40 p-8 shadow-2xl">
          <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary/50 to-accent/30 blur-xl transition duration-500 group-hover:scale-125" />
          <div className="relative space-y-4">
            <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
            <p className="text-sm text-white/60">{feature.description}</p>
            <ul className="space-y-2 text-sm text-white/50">
              {feature.stats.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default FeatureGrid;
