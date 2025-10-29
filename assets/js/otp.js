const OTP_STORE_KEY = "psycheprep-otp";
const OTP_EXPIRY_MINUTES = 5;

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function storeOtp(email, otp) {
  const payload = {
    email,
    otp,
    expiresAt: Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000,
  };
  sessionStorage.setItem(OTP_STORE_KEY, JSON.stringify(payload));
  console.info(`OTP for ${email}: ${otp}`);
}

export function requestOtp(email) {
  const otp = generateOtp();
  storeOtp(email, otp);
  return otp;
}

export function verifyOtp(email, inputOtp) {
  try {
    const stored = JSON.parse(sessionStorage.getItem(OTP_STORE_KEY) || "{}");
    if (!stored.email || !stored.otp) {
      return { success: false, reason: "No OTP requested" };
    }
    if (stored.email !== email) {
      return { success: false, reason: "Email mismatch" };
    }
    if (Date.now() > stored.expiresAt) {
      return { success: false, reason: "OTP expired" };
    }
    if (stored.otp !== inputOtp) {
      return { success: false, reason: "Incorrect OTP" };
    }
    sessionStorage.removeItem(OTP_STORE_KEY);
    return { success: true };
  } catch (error) {
    console.error("OTP parse error", error);
    return { success: false, reason: "Invalid OTP state" };
  }
}
