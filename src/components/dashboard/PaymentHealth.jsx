const PaymentHealth = () => (
  <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-white">Payment health</h3>
      <span className="text-xs text-emerald-400">Stripe + Razorpay synced</span>
    </div>
    <div className="mt-6 space-y-4 text-sm text-white/70">
      <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4">
        <span>MTD revenue</span>
        <span className="text-white">₹18.3L</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4">
        <span>Refund rate</span>
        <span className="text-white">0.7%</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4">
        <span>Pending settlements</span>
        <span className="text-white">₹2.1L</span>
      </div>
    </div>
    <button className="mt-6 w-full rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:text-white">
      Download GST report
    </button>
  </section>
);

export default PaymentHealth;
