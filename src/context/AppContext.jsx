import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { learners, mockExams, otpStore, securityFeed, securityTelemetry, weakTopicSignals } from '../data/mockData.js';
import { generateOtp, validateOtp } from '../utils/otp.js';
import env from '../config/env.js';

const AppContext = createContext(null);

const defaultTheme = (() => {
  if (typeof localStorage === 'undefined') return 'nebula';
  return localStorage.getItem('theme') || 'nebula';
})();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [session, setSession] = useState(() => {
    if (typeof sessionStorage === 'undefined') return null;
    const cached = sessionStorage.getItem('session');
    if (!cached) return null;
    try {
      const parsed = JSON.parse(cached);
      if (parsed?.issuedAt && env.sessionTtlMinutes) {
        const expiresAt = parsed.issuedAt + env.sessionTtlMinutes * 60 * 1000;
        if (Date.now() > expiresAt) {
          sessionStorage.removeItem('session');
          return null;
        }
      }
      return parsed;
    } catch (error) {
      console.warn('Failed to parse cached session', error);
      sessionStorage.removeItem('session');
      return null;
    }
  });
  const [activeExam, setActiveExam] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!session) {
      sessionStorage.removeItem('session');
      return;
    }
    const payload = session.issuedAt ? session : { ...session, issuedAt: Date.now() };
    sessionStorage.setItem('session', JSON.stringify(payload));
  }, [session]);

  const value = useMemo(
    () => ({
      config: env,
      theme,
      setTheme,
      session,
      setSession,
      activeExam,
      setActiveExam,
      incidents,
      setIncidents,
      learners,
      mockExams,
      otpStore,
      securityTelemetry,
      securityFeed,
      weakTopicSignals,
      generateOtp,
      validateOtp
    }),
    [theme, session, activeExam, incidents]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
};
