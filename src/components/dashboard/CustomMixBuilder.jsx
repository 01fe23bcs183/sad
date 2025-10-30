import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';

const CustomMixBuilder = () => {
  const navigate = useNavigate();
  const { setActiveExam } = useAppContext();
  const [blueprint, setBlueprint] = useState({ pyq: 40, inference: 30, application: 30 });

  const updateField = (field, value) => {
    setBlueprint((prev) => ({ ...prev, [field]: Number(value) }));
  };

  const buildExam = () => {
    setActiveExam({
      id: 'custom-blueprint',
      title: 'Custom Blueprint Exam',
      duration: 60,
      focus: 'custom',
      blueprint
    });
    navigate('/exam');
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Custom chapter mix builder</h3>
          <p className="text-sm text-white/60">Drag sliders to craft hyper-targeted question stacks. We auto-normalise for fairness.</p>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-white/40">PYQs + Live bank</span>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {Object.entries(blueprint).map(([key, value]) => (
          <label key={key} className="space-y-3 text-sm text-white/70">
            <span className="flex items-center justify-between">
              {key.toUpperCase()}
              <span className="text-white">{value}%</span>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(event) => updateField(key, event.target.value)}
              className="w-full accent-primary"
            />
          </label>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between text-xs text-white/50">
        <span>Auto-balancing ensures totals equal 100%.</span>
        <button onClick={buildExam} className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-white">
          Generate mix
        </button>
      </div>
    </section>
  );
};

export default CustomMixBuilder;
