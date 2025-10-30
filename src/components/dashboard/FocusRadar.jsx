const focusAreas = [
  { label: 'Cognition', score: 78 },
  { label: 'Research', score: 64 },
  { label: 'Clinical', score: 71 },
  { label: 'Social', score: 82 },
  { label: 'Development', score: 58 }
];

const FocusRadar = () => (
  <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
    <div className="flex flex-wrap items-center justify-between gap-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Mastery radar</h3>
        <p className="max-w-md text-sm text-white/60">
          Each spoke tracks precision, recall, and cognitive load. Our neural engine identifies dips and dispatches micro-drills in under 15 seconds.
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm text-white/70">
          {focusAreas.map((area) => (
            <p key={area.label}>
              {area.label}
              <span className="ml-2 text-white">{area.score}%</span>
            </p>
          ))}
        </div>
      </div>
      <div className="relative h-56 w-56 rounded-full border border-white/20">
        <div className="absolute inset-6 rounded-full border border-white/10" />
        <div className="absolute inset-12 rounded-full border border-white/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-white">Core IQ 76</span>
        </div>
      </div>
    </div>
  </section>
);

export default FocusRadar;
