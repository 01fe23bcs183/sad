const marqueeItems = [
  'Adaptive digital twin builder',
  'Weak-topic AI guesser',
  'PYQ-only blitz engine',
  'Admin intelligence cockpit',
  'Deep proctoring & IP locks',
  'Live exam analytics'
];

const HeroMarquee = () => {
  return (
    <div className="overflow-hidden rounded-full border border-white/10 bg-white/5 py-3">
      <div className="flex animate-[marquee_20s_linear_infinite] gap-8 whitespace-nowrap px-6 text-xs uppercase tracking-[0.3em] text-white/60">
        {marqueeItems.concat(marqueeItems).map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default HeroMarquee;
