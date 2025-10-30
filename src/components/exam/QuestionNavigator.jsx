const QuestionNavigator = ({
  questions,
  currentQuestionId,
  currentIndex,
  responses,
  flagged,
  onJump,
  onToggleFlag
}) => (
  <aside className="space-y-4 rounded-3xl border border-white/10 bg-surface-card/70 p-5 text-xs text-white/70">
    <header className="space-y-1">
      <h2 className="text-lg font-semibold text-white">Question palette</h2>
      <p className="text-white/60">Jump between sections, review flagged items, and audit completion.</p>
    </header>
    <div className="grid grid-cols-5 gap-2 text-sm">
      {questions.map((question, index) => {
        const isCurrent = question.id === currentQuestionId;
        const answered = responses[question.id] !== undefined;
        const isFlagged = Boolean(flagged[question.id]);
        return (
          <button
            key={question.id}
            type="button"
            onClick={() => onJump(index)}
            className={`flex h-10 items-center justify-center rounded-xl border transition ${
              isCurrent
                ? 'border-primary bg-primary/20 text-white'
                : answered
                ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
                : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
            } ${isFlagged ? 'ring-2 ring-amber-400/70 ring-offset-2 ring-offset-surface-card/70' : ''}`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
    <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Legend</p>
      <div className="flex flex-wrap gap-3 text-[11px]">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-3 w-3 rounded-full bg-primary/70" /> Current
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex h-3 w-3 rounded-full bg-emerald-400/70" /> Answered
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex h-3 w-3 rounded-full bg-white/40" /> Pending
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex h-3 w-3 rounded-full bg-amber-400/70" /> Flagged
        </span>
      </div>
    </div>
    {questions[currentIndex] && (
      <button
        type="button"
        onClick={() => onToggleFlag(currentQuestionId)}
        className="w-full rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100"
      >
        {flagged[currentQuestionId] ? 'Remove review flag' : 'Flag for review' }
      </button>
    )}
  </aside>
);

export default QuestionNavigator;
