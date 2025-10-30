const plans = [
  {
    name: 'Launchpad',
    price: '₹1,999',
    cadence: 'per month',
    highlight: false,
    features: ['Full learner cockpit', 'PYQ & adaptive engines', 'OTP gated authentication', 'Proctoring essentials']
  },
  {
    name: 'Astra Elite',
    price: '₹3,999',
    cadence: 'per month',
    highlight: true,
    features: ['Weak-topic AI guesser', 'Custom blueprint creator', 'Live proctor console', 'Priority concierge support']
  },
  {
    name: 'Institution Suite',
    price: 'Talk to us',
    cadence: '',
    highlight: false,
    features: ['SAML / SSO integration', '24/7 integrity ops desk', 'Dedicated IP ranges', 'Custom billing models']
  }
];

const PricingPlans = () => (
  <section className="space-y-8">
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold text-white">Mission-ready pricing</h2>
      <p className="max-w-3xl text-white/70">
        Stripe-ready payment rails, GST-compliant invoices, and offline reconciliation keep finance teams confident while learners enjoy frictionless upgrades.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-xl transition hover:shadow-glow ${
            plan.highlight ? 'border-primary/50 bg-gradient-to-br from-primary/20 via-surface-card to-accent/10' : ''
          }`}
        >
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">{plan.name}</p>
            <p className="text-4xl font-bold">
              {plan.price}
              <span className="ml-2 text-sm font-medium text-white/60">{plan.cadence}</span>
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button className="mt-6 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-white">
            Activate
          </button>
        </div>
      ))}
    </div>
  </section>
);

export default PricingPlans;
