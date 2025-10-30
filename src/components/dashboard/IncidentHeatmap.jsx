const incidents = [
  { code: 'EXIT_FULLSCREEN', count: 2 },
  { code: 'NETWORK_DROP', count: 1 },
  { code: 'IP_CONFLICT', count: 0 },
  { code: 'SHORTCUT', count: 4 }
];

const IncidentHeatmap = () => (
  <section className="rounded-3xl border border-white/10 bg-surface-card/70 p-6">
    <h3 className="text-lg font-semibold text-white">Integrity incident heatmap</h3>
    <div className="mt-6 grid grid-cols-2 gap-4">
      {incidents.map((incident) => (
        <div key={incident.code} className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/70">
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">{incident.code}</span>
          <span className="text-2xl font-semibold text-white">{incident.count}</span>
          <span className="text-xs text-white/40">Past 24h</span>
        </div>
      ))}
    </div>
    <button className="mt-6 w-full rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:text-white">
      Open proctor console
    </button>
  </section>
);

export default IncidentHeatmap;
