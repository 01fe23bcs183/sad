import { useAppContext } from '../../context/AppContext.jsx';

const metricClasses = 'rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-xs text-white/70';

const SecurityConsole = () => {
  const { securityTelemetry, securityFeed } = useAppContext();

  return (
    <section className="space-y-5 rounded-3xl border border-white/10 bg-surface-card/60 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Integrity control centre</h2>
          <p className="text-xs text-white/50">Real-time lockdown stats, geofence alerts, and high-risk session triage.</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/60">
          Last sync {securityTelemetry.lastSync}
        </span>
      </header>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className={metricClasses}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Incidents today</p>
          <p className="mt-1 text-2xl font-semibold text-white">{securityTelemetry.incidentsToday}</p>
        </div>
        <div className={metricClasses}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Auto lockdowns</p>
          <p className="mt-1 text-2xl font-semibold text-white">{securityTelemetry.autoLockdowns}</p>
        </div>
        <div className={metricClasses}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Heartbeat latency</p>
          <p className="mt-1 text-2xl font-semibold text-white">{securityTelemetry.averageHeartbeatLatency}</p>
        </div>
        <div className={metricClasses}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Geo-fence alerts</p>
          <p className="mt-1 text-2xl font-semibold text-white">{securityTelemetry.geoFenceAlerts}</p>
        </div>
        <div className={metricClasses}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">IP variance</p>
          <p className="mt-1 text-2xl font-semibold text-white">{securityTelemetry.ipVariance}</p>
        </div>
        <div className={metricClasses}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Proctor feed</p>
          <p className="mt-1 text-2xl font-semibold text-white">{securityFeed.length}</p>
        </div>
      </div>
      <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Live escalations</p>
        <ul className="space-y-2 text-xs text-white/70">
          {securityFeed.map((item) => (
            <li key={item.id} className="rounded-2xl border border-white/10 bg-surface-card/60 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-white">{item.candidate}</p>
                <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {item.timestamp}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-white/60">{item.code}</p>
              <p className="mt-1 text-[11px] text-amber-200">{item.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SecurityConsole;
