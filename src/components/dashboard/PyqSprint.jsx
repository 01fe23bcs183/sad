import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';

const PyqSprint = () => {
  const { setActiveExam } = useAppContext();
  const navigate = useNavigate();

  const launchPyq = () => {
    setActiveExam({
      id: 'pyq-marathon',
      title: 'PYQ Sprint Deck',
      duration: 35,
      focus: 'pyq',
      questions: 30
    });
    navigate('/exam');
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-surface-card/70 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">PYQ sprint mode</h3>
          <p className="text-sm text-white/60">Fast-forward through previous year papers with AI explanations & similarity clustering.</p>
          <ul className="space-y-2 text-xs text-white/50">
            <li>• 1,200+ curated PYQs</li>
            <li>• Adaptive hint unlocks</li>
            <li>• Performance vs NTA median</li>
          </ul>
        </div>
        <button onClick={launchPyq} className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-white">
          Launch
        </button>
      </div>
    </section>
  );
};

export default PyqSprint;
