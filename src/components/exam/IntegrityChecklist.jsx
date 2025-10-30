const statusStyles = {
  pass: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
  warn: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  fail: 'border-red-400/40 bg-red-400/10 text-red-200'
};

const ChecklistItem = ({ label, status, helper }) => (
  <li className={`rounded-2xl border px-4 py-3 text-xs ${statusStyles[status]}`}>
    <p className="text-[11px] uppercase tracking-[0.2em]">{label}</p>
    {helper && <p className="mt-1 text-[11px] text-white/60">{helper}</p>}
  </li>
);

const IntegrityChecklist = ({
  isFullscreen,
  isFocused,
  networkOnline,
  withinGeofence,
  cameraVerified,
  lockActive,
  incidents
}) => {
  const latestIncident = incidents[incidents.length - 1];

  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-surface-card/70 p-5 text-white">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold">Integrity checklist</h2>
        <p className="text-xs text-white/60">Live enforcement of lockdown signals with automated lockdown triggers.</p>
      </header>
      <ul className="grid gap-3">
        <ChecklistItem label="Fullscreen" status={isFullscreen ? 'pass' : 'fail'} helper={isFullscreen ? 'Immersive mode active' : 'Re-enter fullscreen to continue'} />
        <ChecklistItem label="Focus" status={isFocused ? 'pass' : 'warn'} helper={isFocused ? 'Window focus maintained' : 'Focus shifts are tracked and reported'} />
        <ChecklistItem label="Network" status={networkOnline ? 'pass' : 'fail'} helper={networkOnline ? 'Proctor link alive' : 'Offline incidents will be reviewed'} />
        <ChecklistItem label="Geo-fence" status={withinGeofence ? 'pass' : 'fail'} helper={withinGeofence ? 'Authorised test centre' : 'Invigilator review required'} />
        <ChecklistItem label="Camera" status={cameraVerified ? 'pass' : 'fail'} helper={cameraVerified ? 'Biometric handshake confirmed' : 'Camera stream blocked'} />
        <ChecklistItem label="Lock status" status={lockActive ? 'fail' : 'pass'} helper={lockActive ? 'Session locked – contact invigilator' : 'Secure'} />
      </ul>
      <footer className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/60">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Latest incident</p>
        {latestIncident ? (
          <div className="mt-1 space-y-1">
            <p className="text-white/80">{latestIncident.code}</p>
            <p className="text-[11px] text-white/50">{new Date(latestIncident.timestamp).toLocaleTimeString()}</p>
          </div>
        ) : (
          <p className="mt-1 text-[11px]">No anomalies recorded in this session.</p>
        )}
      </footer>
    </section>
  );
};

export default IntegrityChecklist;
