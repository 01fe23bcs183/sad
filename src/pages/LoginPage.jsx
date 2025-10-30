import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

const steps = ['email', 'otp'];

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { generateOtp, validateOtp, otpStore, learners, setSession } = useAppContext();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState(null);
  const [sending, setSending] = useState(false);

  const requestOtp = () => {
    if (!email) {
      setMessage({ type: 'error', text: 'Enter your registered email to receive an OTP.' });
      return;
    }
    setSending(true);
    setTimeout(() => {
      const code = generateOtp(email, otpStore);
      console.info('OTP dispatched', code);
      setSending(false);
      setStep('otp');
      setMessage({ type: 'success', text: 'OTP sent! Check your inbox (simulated).' });
    }, 400);
  };

  const completeLogin = () => {
    if (!otp) {
      setMessage({ type: 'error', text: 'Enter the OTP you received.' });
      return;
    }
    const isValid = validateOtp(email, otp, otpStore);
    if (!isValid) {
      setMessage({ type: 'error', text: 'Invalid or expired OTP. Try again.' });
      return;
    }
    const user = learners.find((learner) => learner.email === email) || {
      id: 'admin-001',
      name: 'Operations Admin',
      email,
      role: 'admin'
    };
    const nextSession = {
      user,
      issuedAt: Date.now(),
      lockdown: false,
      ipLock: null
    };
    setSession(nextSession);
    const redirectTo = location.state?.from?.pathname || (user.role === 'admin' ? '/admin' : '/dashboard');
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-white">Access PsychePrep cockpit</h1>
        <p className="text-white/70">
          OTP-secured entry ensures every learner and admin is verified. Automatic IP locks activate for live exams, while sandbox access keeps exploration simple.
        </p>
        <ul className="space-y-3 text-white/60">
          <li>• Enterprise-grade AWS SES integration ready</li>
          <li>• Step-up verification during exams</li>
          <li>• Activity mirrored into admin audit logs</li>
        </ul>
      </div>
      <div className="rounded-3xl border border-white/10 bg-surface-card/70 p-8 shadow-xl backdrop-blur">
        <div className="flex gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
          {steps.map((item) => (
            <span key={item} className={item === step ? 'text-white' : undefined}>
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          <label className="block text-sm text-white/70">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
              placeholder="you@psycheprep.ai"
            />
          </label>
          {step === 'otp' && (
            <label className="block text-sm text-white/70">
              One-time password
              <input
                type="text"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm tracking-[0.5em] text-white focus:border-primary focus:outline-none"
                placeholder="000000"
              />
            </label>
          )}
          {message && (
            <p className={`text-xs ${message.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>{message.text}</p>
          )}
          <div className="flex gap-4 pt-4">
            {step === 'email' ? (
              <button
                onClick={requestOtp}
                disabled={sending}
                className="flex-1 rounded-2xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-40"
              >
                {sending ? 'Sending…' : 'Send OTP'}
              </button>
            ) : (
              <button
                onClick={completeLogin}
                className="flex-1 rounded-2xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-semibold text-white shadow-glow"
              >
                Verify & Enter
              </button>
            )}
            {step === 'otp' && (
              <button
                onClick={requestOtp}
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/70"
              >
                Resend
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
