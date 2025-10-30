import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';

const DashboardHero = ({ learner }) => {
  const navigate = useNavigate();
  const { setActiveExam } = useAppContext();

  const launchAdaptive = () => {
    const payload = {
      id: 'adaptive-boost',
      title: 'Weak-topic Adaptive Booster',
      duration: 45,
      focus: 'weak-topic',
      questions: 45
    };
    setActiveExam(payload);
    navigate('/exam');
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/30 via-surface-card to-black/70 p-10 shadow-glow">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">Welcome back, {learner.name.split(' ')[0]}</p>
          <h2 className="text-3xl font-semibold text-white">Continue your mastery sprint</h2>
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <span>Streak: {learner.streak} days</span>
            <span>Mastery: {learner.mastery}%</span>
            <span>Plan: {learner.plan}</span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-white/50">
            {learner.recommendations.map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1">
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={launchAdaptive}
              className="rounded-full bg-black/60 px-5 py-2 text-sm font-semibold text-white transition hover:bg-black/80"
            >
              Launch adaptive booster
            </button>
            <button className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:text-white">
              View analytics
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/10 px-8 py-6 text-white/80">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Today&apos;s focus blend</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• 12 PYQs, 16 inference, 10 application</li>
            <li>• 3 weak-topic rescues</li>
            <li>• 2 mindfulness cooldowns</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
