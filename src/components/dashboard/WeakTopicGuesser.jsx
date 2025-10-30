import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';

const WeakTopicGuesser = () => {
  const navigate = useNavigate();
  const { weakTopicSignals, setActiveExam } = useAppContext();

  const launchRescue = (topic) => {
    setActiveExam({
      id: `rescue-${topic.topic}`,
      title: `${topic.topic} Rescue Drill`,
      duration: 25,
      focus: 'weak-topic',
      questions: 20,
      meta: topic
    });
    navigate('/exam');
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-surface-card/60 p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Weak-topic AI guesser</h3>
          <p className="text-sm text-white/60">Signal score blends error drift, response latency, and emotional tagging.</p>
        </div>
        <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-xs font-medium text-emerald-300">
          Updated 2m ago
        </span>
      </div>
      <div className="mt-6 space-y-4">
        {weakTopicSignals.map((topic) => (
          <article key={topic.topic} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 p-5">
            <div>
              <h4 className="text-sm font-semibold text-white">{topic.topic}</h4>
              <p className="text-xs text-white/50">Confidence {Math.round(topic.confidence * 100)}%</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
              {topic.recommendedResources.map((resource) => (
                <span key={resource} className="rounded-full border border-white/10 px-3 py-1">
                  {resource}
                </span>
              ))}
            </div>
            <button
              onClick={() => launchRescue(topic)}
              className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-white"
            >
              Deploy rescue
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WeakTopicGuesser;
