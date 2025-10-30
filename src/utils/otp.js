import env from '../config/env.js';

const createOtp = (length) => {
  const digits = '0123456789';
  return Array.from({ length })
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join('');
};

const OTP_EXPIRY_MS = env.otpExpiryMinutes * 60 * 1000;
const OTP_LENGTH = Number.isFinite(env.otpLength) && env.otpLength > 0 ? env.otpLength : 6;

export const generateOtp = (email, store) => {
  const otp = createOtp(OTP_LENGTH);
  store.set(email, { otp, expires: Date.now() + OTP_EXPIRY_MS });
  return otp;
};

export const validateOtp = (email, otp, store) => {
  const record = store.get(email);
  if (!record) return false;
  if (record.expires < Date.now()) {
    store.delete(email);
    return false;
  }
  const isValid = record.otp === otp;
  if (isValid) {
    store.delete(email);
  }
  return isValid;
};
