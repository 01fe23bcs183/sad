const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'pending';
  return new Date(timestamp).toLocaleTimeString();
};

const SessionVitals = ({
  ipAddress,
  deviceFingerprint,
  lastHeartbeat,
  geoLocation,
  withinGeofence
}) => {
  const geoText = geoLocation ? `${geoLocation.lat.toFixed(3)}, ${geoLocation.lng.toFixed(3)}` : 'acquiring…';

  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-surface-card/70 p-5 text-xs text-white/70">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-white">Session vitals</h2>
        <p className="text-white/50">IP locks, device fingerprint, heartbeats, and venue compliance.</p>
      </header>
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">IP address</p>
          <p className="mt-1 text-sm text-white">{ipAddress || 'resolving…'}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Device fingerprint</p>
          <p className="mt-1 break-all text-[11px] text-white/70">{deviceFingerprint || 'pending fingerprint handshake'}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Last heartbeat</p>
          <p className="mt-1 text-sm text-white">{formatTimestamp(lastHeartbeat)}</p>
        </div>
        <div
          className={`rounded-2xl border px-4 py-3 ${
            withinGeofence ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' : 'border-red-400/40 bg-red-400/10 text-red-200'
          }`}
        >
          <p className="text-[10px] uppercase tracking-[0.3em]">Geo-fence</p>
          <p className="mt-1 text-sm">{withinGeofence ? 'Venue verified' : 'Outside allowed venue'}</p>
          <p className="text-[11px] text-white/60">{geoText}</p>
        </div>
      </div>
    </section>
  );
};

export default SessionVitals;
