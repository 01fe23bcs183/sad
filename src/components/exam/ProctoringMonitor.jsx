const ProctoringMonitor = ({
  incidents,
  isFullscreen,
  isFocused,
  networkOnline,
  ipAddress,
  lockActive,
  proctoringSocket,
  auditEndpoint,
  cameraVerified,
  withinGeofence,
  lastHeartbeat
}) => (
  <aside className="space-y-4 rounded-3xl border border-white/10 bg-surface-card/70 p-5">
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-white">Proctoring monitor</h2>
      <p className="text-xs text-white/60">Fullscreen, focus, network, geofence, and biometrics enforced in real time.</p>
    </div>
    <div className="space-y-3 text-xs text-white/60">
      <div className={`rounded-2xl border px-4 py-3 ${isFullscreen ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' : 'border-red-400/40 bg-red-400/10 text-red-200'}`}>
        Fullscreen {isFullscreen ? 'locked' : 'breached'}
      </div>
      <div className={`rounded-2xl border px-4 py-3 ${isFocused ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' : 'border-red-400/40 bg-red-400/10 text-red-200'}`}>
        Focus {isFocused ? 'stable' : 'lost'}
      </div>
      <div className={`rounded-2xl border px-4 py-3 ${networkOnline ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' : 'border-red-400/40 bg-red-400/10 text-red-200'}`}>
        Network {networkOnline ? 'online' : 'offline'}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        IP lock {ipAddress || 'acquiring…'}
      </div>
      <div className={`rounded-2xl border px-4 py-3 ${cameraVerified ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' : 'border-red-400/40 bg-red-400/10 text-red-200'}`}>
        Camera {cameraVerified ? 'verified' : 'blocked'}
      </div>
      <div className={`rounded-2xl border px-4 py-3 ${withinGeofence ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' : 'border-red-400/40 bg-red-400/10 text-red-200'}`}>
        Geo-fence {withinGeofence ? 'confirmed' : 'breached'}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        Last heartbeat {lastHeartbeat ? new Date(lastHeartbeat).toLocaleTimeString() : 'pending'}
      </div>
    </div>
    <div className="space-y-3">
      <h3 className="text-xs uppercase tracking-[0.2em] text-white/40">Incidents</h3>
      <div className="space-y-2 text-xs text-white/60">
        {incidents.length === 0 && <p className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">No incidents recorded</p>}
        {incidents.map((incident) => (
          <p key={incident.timestamp} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="font-semibold text-white">{incident.code}</span>
            <br />
            <span className="text-white/40">{new Date(incident.timestamp).toLocaleTimeString()}</span>
          </p>
        ))}
      </div>
    </div>
    <div className="space-y-1 text-[10px] uppercase tracking-[0.3em] text-white/30">
      <p>Socket: {proctoringSocket || 'not-configured'}</p>
      <p>Audit: {auditEndpoint || 'not-configured'}</p>
    </div>
    {lockActive && <p className="rounded-2xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-xs font-semibold text-red-300">Session locked — contact invigilator.</p>}
  </aside>
);

export default ProctoringMonitor;
