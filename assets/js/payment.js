const PAYMENT_STORAGE_KEY = "psycheprep-payments";
const PAYMENT_EVENT = "payment:recorded";

function loadPayments() {
  try {
    return JSON.parse(localStorage.getItem(PAYMENT_STORAGE_KEY) || "[]");
  } catch (error) {
    console.error("Failed to parse payment store", error);
    return [];
  }
}

function persistPayments(entries) {
  localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(entries));
}

export function recordPayment(event) {
  const payments = loadPayments();
  payments.unshift(event);
  persistPayments(payments);
  window.dispatchEvent(new CustomEvent(PAYMENT_EVENT, { detail: event }));
}

export function getPayments() {
  return loadPayments();
}

export function initPaymentButtons(selector = '[data-action="checkout"], [data-action="new-payment"]') {
  document.querySelectorAll(selector).forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.plan || "starter";
      const amount = plan === "ultimate" ? 1499 : plan === "pro" ? 999 : 499;
      const event = {
        id: `txn-${Date.now()}`,
        plan,
        amount,
        status: "Paid",
        date: new Date().toISOString().split("T")[0],
      };
      recordPayment(event);
      showPaymentToast(plan, amount);
    });
  });
}

function showPaymentToast(plan, amount) {
  const toast = document.getElementById("toast");
  if (!toast) {
    alert(`Payment simulated for ${plan} plan: ₹${amount}`);
    return;
  }

  toast.textContent = `Payment authorized for ${plan.toUpperCase()} plan (₹${amount}). Check email for receipt.`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

export function observePayments(callback) {
  window.addEventListener(PAYMENT_EVENT, (event) => callback(event.detail));
}
