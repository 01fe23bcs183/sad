const metrics = [
  { label: 'Active learners', value: '1,284', delta: '+12.4%' },
  { label: 'Live sessions', value: '42', delta: '+6.2%' },
  { label: 'Integrity incidents', value: '3', delta: '-41%' },
  { label: 'Revenue (MTD)', value: '₹18.3L', delta: '+21%' }
];

const AdminOverview = () => (
  <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-primary/30 via-surface-card to-black/60 p-10 shadow-glow">
    <div className="flex flex-wrap items-center justify-between gap-6">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-white">Operations command center</h2>
        <p className="max-w-2xl text-sm text-white/70">
          Real-time invigilation, payment telemetry, and learner mastery insights converge here. Trigger webhooks to Slack, Teams, or Opsgenie in one click.
        </p>
      </div>
      <button className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:text-white">
        Export daily brief
      </button>
    </div>
    <div className="mt-8 grid gap-6 md:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">{metric.label}</p>
          <p className="mt-4 text-3xl font-semibold">{metric.value}</p>
          <p className="text-xs text-emerald-400">{metric.delta}</p>
        </div>
      ))}
    </div>
  </section>
);

export default AdminOverview;
