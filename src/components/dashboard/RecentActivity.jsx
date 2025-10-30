const activities = [
  { label: 'Weak-topic rescue: Neurotransmission', time: '12 mins ago', impact: '+14% accuracy' },
  { label: 'PYQ sprint: Social Influence', time: '2 hrs ago', impact: '+9 percentile' },
  { label: 'Mindfulness cooldown session', time: 'Yesterday', impact: 'Focus reset achieved' }
];

const RecentActivity = () => (
  <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
    <h3 className="text-lg font-semibold text-white">Recent activity</h3>
    <ul className="mt-4 space-y-4 text-sm text-white/70">
      {activities.map((item) => (
        <li key={item.label} className="flex flex-col gap-1 rounded-2xl border border-white/5 bg-white/5 p-4">
          <span className="font-semibold text-white">{item.label}</span>
          <span className="text-xs text-white/50">{item.time}</span>
          <span className="text-xs text-emerald-400">{item.impact}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default RecentActivity;
