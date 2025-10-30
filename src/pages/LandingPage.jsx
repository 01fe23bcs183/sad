import { Link } from 'react-router-dom';
import HeroMarquee from '../components/landing/HeroMarquee.jsx';
import FeatureGrid from '../components/landing/FeatureGrid.jsx';
import PricingPlans from '../components/landing/PricingPlans.jsx';
import JourneyTimeline from '../components/landing/JourneyTimeline.jsx';
import Testimonials from '../components/landing/Testimonials.jsx';

const LandingPage = () => {
  return (
    <div className="space-y-24">
      <section className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent" /> CUET PG Psychology powerhouse
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI-native preparation suite engineered for NTA-grade excellence.
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            PsychePrep blends adaptive simulations, weak-topic intelligence, and immersive analytics into a single, secure delivery experience—across learner, admin, and exam touchpoints.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white shadow-glow"
            >
              Launch your cockpit
            </Link>
            <Link
              to="/exam"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Try exam sandbox
            </Link>
          </div>
          <HeroMarquee />
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/20 via-white/5 to-accent/20 blur-3xl" />
          <div className="relative space-y-6 rounded-3xl border border-white/10 bg-surface-card/70 p-8 shadow-xl backdrop-blur">
            <h2 className="text-2xl font-semibold">Platform Pulse</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Weekly mastery lift</p>
                <p className="text-3xl font-bold text-white">+18%</p>
                <p className="text-xs text-white/40">Powered by weak-topic rescue drills</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">PYQ conversion</p>
                <p className="text-3xl font-bold text-white">92%</p>
                <p className="text-xs text-white/40">Across 12K solved questions</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Exam uptime</p>
                <p className="text-3xl font-bold text-emerald-400">99.98%</p>
                <p className="text-xs text-white/40">Active monitoring & IP locks</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Learner NPS</p>
                <p className="text-3xl font-bold text-accent">68</p>
                <p className="text-xs text-white/40">Best in category satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeatureGrid />
      <JourneyTimeline />
      <PricingPlans />
      <Testimonials />
    </div>
  );
};

export default LandingPage;
