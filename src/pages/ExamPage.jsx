import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAppContext } from '../context/AppContext.jsx';
import { useExamSecurity } from '../hooks/useExamSecurity.js';
import ProctoringMonitor from '../components/exam/ProctoringMonitor.jsx';
import IntegrityChecklist from '../components/exam/IntegrityChecklist.jsx';
import SessionVitals from '../components/exam/SessionVitals.jsx';
import QuestionNavigator from '../components/exam/QuestionNavigator.jsx';
import { useCountdown } from '../hooks/useCountdown.js';

const mockQuestions = [
  {
    id: 'q1',
    type: 'pyq',
    title: 'Neurotransmission Fundamentals',
    text: 'Which neurotransmitter is primarily associated with reward pathways in the brain?',
    options: ['Serotonin', 'Dopamine', 'GABA', 'Acetylcholine'],
    answer: 1
  },
  {
    id: 'q2',
    type: 'application',
    title: 'Classical Conditioning',
    text: 'A learner is conditioned to associate a bell with food. After repeated pairing, the bell alone elicits salivation. Identify the conditioned stimulus.',
    options: ['Food', 'Bell', 'Salivation', 'Trainer'],
    answer: 1
  },
  {
    id: 'q3',
    type: 'adaptive',
    title: 'Cognitive Bias Diagnostics',
    text: 'Selecting information that confirms existing beliefs best describes which cognitive bias?',
    options: ['Anchoring bias', 'Confirmation bias', 'Availability heuristic', 'Hindsight bias'],
    answer: 1
  },
  {
    id: 'q4',
    type: 'statistical',
    title: 'Inferential Statistics',
    text: 'Which test is most appropriate for comparing means between more than two independent groups?',
    options: ['Paired t-test', 'Wilcoxon signed-rank test', 'ANOVA', 'Chi-square test'],
    answer: 2
  },
  {
    id: 'q5',
    type: 'pyq',
    title: 'Developmental Milestones',
    text: 'According to Piaget, during which stage do children develop object permanence?',
    options: ['Sensorimotor', 'Preoperational', 'Concrete operational', 'Formal operational'],
    answer: 0
  }
];

const ExamPage = () => {
  const navigate = useNavigate();
  const { config, activeExam, setActiveExam, setIncidents, incidents, session, setSession } = useAppContext();
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [flagged, setFlagged] = useState({});

  useEffect(() => {
    if (!activeExam) {
      navigate('/dashboard');
    }
  }, [activeExam, navigate]);

  const handleIncident = (incident) => {
    setIncidents((prev) => [...prev, incident]);
  };

  const handleLockdown = () => {
    setSession((prev) => (prev ? { ...prev, lockdown: true } : prev));
  };

  const {
    isFullscreen,
    isFocused,
    networkOnline,
    ipAddress,
    geoLocation,
    withinGeofence,
    cameraVerified,
    lastHeartbeat,
    deviceFingerprint,
    requestFullscreen,
    releaseFullscreen,
    verifyIp
  } = useExamSecurity({
    onIncident: handleIncident,
    onLockdown: handleLockdown
  });

  useEffect(() => {
    if (!session?.ipLock && ipAddress) {
      setSession((prev) => (prev ? { ...prev, ipLock: ipAddress } : prev));
    }
    if (session?.ipLock && ipAddress) {
      verifyIp(session.ipLock);
    }
  }, [ipAddress, session, setSession, verifyIp]);

  useEffect(() => {
    setResponses({});
    setFlagged({});
    setCurrentQuestionIndex(0);
  }, [activeExam?.id]);

  const questions = useMemo(() => activeExam?.questions ?? mockQuestions, [activeExam?.questions]);
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  const meta = useMemo(
    () => ({
      title: activeExam?.title ?? 'Exam Session',
      duration: activeExam?.duration ?? 0,
      scheduled: format(Date.now(), 'PPPP p'),
      totalQuestions: questions.length
    }),
    [activeExam, questions.length]
  );

  const selectOption = (questionId, index) => {
    setResponses((prev) => ({ ...prev, [questionId]: index }));
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const goNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const goPrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const toggleFlag = (questionId) => {
    setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const submitExam = useCallback(
    async ({ auto = false } = {}) => {
      if (submitted) return;
      setSubmitted(true);
      if (auto) {
        setAutoSubmitted(true);
      }
      await releaseFullscreen();
      setActiveExam(null);
      setIncidents([]);
      navigate('/dashboard');
    },
    [navigate, releaseFullscreen, setActiveExam, setIncidents, submitted]
  );

  const handleExpire = useCallback(() => submitExam({ auto: true }), [submitExam]);

  const { formatted: remainingTime } = useCountdown(activeExam?.duration ?? 0, {
    onExpire: handleExpire
  });

  const answeredCount = useMemo(() => Object.keys(responses).length, [responses]);
  const flaggedCount = useMemo(() => Object.values(flagged).filter(Boolean).length, [flagged]);
  const completion = meta.totalQuestions ? Math.round((answeredCount / meta.totalQuestions) * 100) : 0;

  if (!activeExam) {
    return null;
  }

  return (
    <div className="grid gap-8 2xl:grid-cols-[1.8fr,1fr]">
      <div className="space-y-8">
        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-white">{meta.title}</h1>
              <p className="text-xs text-white/50">Scheduled {meta.scheduled}</p>
              <p className="text-[11px] text-white/40">Mode: {activeExam?.mode?.toUpperCase() || 'STANDARD'} • {meta.totalQuestions} questions</p>
            </div>
            <div className="flex flex-col items-end gap-2 text-xs text-white/60">
              <span className="rounded-full border border-white/10 px-3 py-1">Remaining {remainingTime}</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Progress {completion}%</span>
              <div className="flex gap-2">
                <button onClick={requestFullscreen} className="rounded-full border border-white/10 px-3 py-1 text-white/70">
                  Lock fullscreen
                </button>
                <button onClick={goPrevious} className="rounded-full border border-white/10 px-3 py-1 text-white/70">
                  Prev
                </button>
                <button onClick={goNext} className="rounded-full border border-white/10 px-3 py-1 text-white/70">
                  Next
                </button>
              </div>
            </div>
          </header>
          {currentQuestion && (
            <article className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-white/60">Question {currentQuestionIndex + 1}</p>
                  <h2 className="text-lg font-semibold text-white">{currentQuestion.title || 'Cognitive reasoning task'}</h2>
                </div>
                <div className="text-right text-xs text-white/40">
                  <p className="uppercase tracking-[0.3em]">{currentQuestion.type}</p>
                  {flagged[currentQuestion.id] && <p className="text-amber-300">Flagged for review</p>}
                </div>
              </div>
              <p className="text-base leading-relaxed text-white/90">{currentQuestion.text}</p>
              <div className="grid gap-3">
                {currentQuestion.options.map((option, optionIndex) => (
                  <label
                    key={option}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                      responses[currentQuestion.id] === optionIndex
                        ? 'border-primary bg-primary/20 text-white'
                        : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      checked={responses[currentQuestion.id] === optionIndex}
                      onChange={() => selectOption(currentQuestion.id, optionIndex)}
                      className="accent-primary"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </article>
          )}
          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="space-y-1 text-xs text-white/50">
              <p>Incidents logged: {incidents.length}</p>
              <p>Flagged: {flaggedCount}</p>
            </div>
            <button
              onClick={() => submitExam()}
              className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2 text-sm font-semibold text-white"
            >
              Submit session
            </button>
          </footer>
          {submitted && (
            <p className="text-xs text-emerald-400">
              {autoSubmitted ? 'Auto-submitted on timer completion. ' : ''}Submission received. Review analytics in dashboard.
            </p>
          )}
        </section>
        <QuestionNavigator
          questions={questions}
          currentQuestionId={currentQuestion?.id}
          currentIndex={currentQuestionIndex}
          responses={responses}
          flagged={flagged}
          onJump={goToQuestion}
          onToggleFlag={toggleFlag}
        />
      </div>
      <div className="space-y-6">
        <ProctoringMonitor
          incidents={incidents}
          isFullscreen={isFullscreen}
          isFocused={isFocused}
          networkOnline={networkOnline}
          ipAddress={ipAddress}
          lockActive={session?.lockdown}
          proctoringSocket={config.proctoringSocketUrl}
          auditEndpoint={config.auditLogEndpoint}
          cameraVerified={cameraVerified}
          withinGeofence={withinGeofence}
          lastHeartbeat={lastHeartbeat}
        />
        <IntegrityChecklist
          incidents={incidents}
          isFullscreen={isFullscreen}
          isFocused={isFocused}
          networkOnline={networkOnline}
          withinGeofence={withinGeofence}
          cameraVerified={cameraVerified}
          lockActive={session?.lockdown}
        />
        <SessionVitals
          ipAddress={ipAddress}
          deviceFingerprint={deviceFingerprint}
          lastHeartbeat={lastHeartbeat}
          geoLocation={geoLocation}
          withinGeofence={withinGeofence}
        />
      </div>
    </div>
  );
};

export default ExamPage;
