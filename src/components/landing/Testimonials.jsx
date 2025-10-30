const testimonials = [
  {
    quote:
      'We migrated from a patchwork of tools to PsychePrep. The weak-topic guesser alone shaved 3 weeks off our cohort rescue plans.',
    name: 'Dr. Radhika Nair',
    role: 'Academic Director, MindBridge Academy'
  },
  {
    quote:
      'The proctoring stack is unreal—fullscreen locks, session biometrics, and instant incident playback. Our integrity scores never dipped.',
    name: 'Arjun Saha',
    role: 'Head of Assessments, PsyStack'
  },
  {
    quote:
      'PYQ blender lets my toppers create impossibly precise drills. Conversion rate hit 92% across our 1,200 learners.',
    name: 'Meera Verma',
    role: 'Lead Mentor, Zenith Scholars'
  }
];

const Testimonials = () => (
  <section className="space-y-8">
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold text-white">Loved by institutes & toppers alike</h2>
      <p className="max-w-3xl text-white/70">Industry leaders trust our exam security, admin intelligence, and learner delight quotient to scale their CUET programs.</p>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <figure key={testimonial.name} className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-lg">
          <blockquote className="text-sm text-white/70">“{testimonial.quote}”</blockquote>
          <figcaption className="mt-6 space-y-1">
            <p className="text-sm font-semibold text-white">{testimonial.name}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">{testimonial.role}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default Testimonials;
