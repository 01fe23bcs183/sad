import { initThemeControls } from "./theme.js";
import { initPaymentButtons } from "./payment.js";
import { requestOtp, verifyOtp } from "./otp.js";

const toast = document.getElementById("toast");
const otpForm = document.getElementById("otpForm");
const sendOtpButton = document.getElementById("sendOtp");
const emailInput = document.getElementById("email");
const otpInput = document.getElementById("otp");
const roleSelect = document.getElementById("role");

initThemeControls();
initPaymentButtons();

function showToast(message, tone = "neutral") {
  if (!toast) return;
  toast.textContent = message;
  toast.dataset.tone = tone;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

sendOtpButton.addEventListener("click", () => {
  if (!emailInput.value) {
    showToast("Enter your email to receive OTP", "warning");
    emailInput.focus();
    return;
  }
  const otp = requestOtp(emailInput.value.trim().toLowerCase());
  showToast(`OTP sent to ${emailInput.value}. Check console for test OTP.`, "success");
  console.log("Mock OTP:", otp);
});

otpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value.trim().toLowerCase();
  const otp = otpInput.value.trim();
  const role = roleSelect.value;

  const result = verifyOtp(email, otp);
  if (!result.success) {
    showToast(result.reason || "Invalid OTP", "warning");
    return;
  }

  showToast("OTP verified. Redirecting...", "success");
  const destination = role === "admin" ? "admin.html" : role === "mentor" ? "admin.html#reports" : "user.html";
  setTimeout(() => {
    window.location.href = destination;
  }, 600);
});

if (!toast) {
  console.warn("Toast element missing. Notifications will use alert fallback.");
}
