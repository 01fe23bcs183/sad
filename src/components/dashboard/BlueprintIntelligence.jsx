const blueprints = [
  {
    name: 'Adaptive Grand Simulation',
    scheduled: 'Sat 9 AM',
    coverage: '96%',
    notes: 'Auto-inject weak topics'
  },
  {
    name: 'PYQ Blitz',
    scheduled: 'Daily 8 PM',
    coverage: '88%',
    notes: 'Cloned from 2023 set'
  }
];

const BlueprintIntelligence = () => (
  <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-white">Blueprint intelligence</h3>
      <button className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/70 transition hover:text-white">
        Create blueprint
      </button>
    </div>
    <div className="mt-6 space-y-4 text-sm text-white/70">
      {blueprints.map((blueprint) => (
        <div key={blueprint.name} className="rounded-2xl border border-white/5 bg-white/5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">{blueprint.name}</p>
              <p className="text-xs text-white/50">Scheduled {blueprint.scheduled}</p>
            </div>
            <div className="flex gap-6 text-xs text-white/50">
              <span>Coverage {blueprint.coverage}</span>
              <span>{blueprint.notes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default BlueprintIntelligence;
