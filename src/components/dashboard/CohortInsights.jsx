const cohorts = [
  {
    name: 'Jan Elites',
    mastery: 82,
    attendance: 94,
    focus: 'Clinical + Research',
    risk: 'Low'
  },
  {
    name: 'FastTrack 2',
    mastery: 68,
    attendance: 88,
    focus: 'Cognition boost',
    risk: 'Medium'
  }
];

const CohortInsights = () => (
  <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-white">Cohort insights</h3>
      <button className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/70 transition hover:text-white">
        View cohorts
      </button>
    </div>
    <div className="mt-6 grid gap-4">
      {cohorts.map((cohort) => (
        <article key={cohort.name} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 p-5">
          <div>
            <h4 className="text-sm font-semibold text-white">{cohort.name}</h4>
            <p className="text-xs text-white/50">Focus: {cohort.focus}</p>
          </div>
          <div className="flex gap-6 text-xs text-white/60">
            <span>Mastery {cohort.mastery}%</span>
            <span>Attendance {cohort.attendance}%</span>
            <span className={cohort.risk === 'Low' ? 'text-emerald-400' : 'text-amber-300'}>Risk {cohort.risk}</span>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default CohortInsights;
