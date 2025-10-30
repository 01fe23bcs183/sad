import { initThemeControls } from "./theme.js";
import { examPaper, weakTopicInsights } from "./data.js";

initThemeControls();

const questionList = document.getElementById("questionList");
const questionTitle = document.getElementById("questionTitle");
const questionMeta = document.getElementById("questionMeta");
const questionContent = document.getElementById("questionContent");
const sectionProgress = document.getElementById("sectionProgress");
const attemptedCount = document.getElementById("attemptedCount");
const flaggedCount = document.getElementById("flaggedCount");
const pendingCount = document.getElementById("pendingCount");
const timeRemaining = document.getElementById("timeRemaining");
const dialog = document.getElementById("dialog");
const dialogPending = document.getElementById("dialogPending");
const securityBanner = document.getElementById("securityBanner");
const fullscreenStatus = document.getElementById("fullscreenStatus");
const focusStatus = document.getElementById("focusStatus");
const networkStatus = document.getElementById("networkStatus");
const incidentDisplay = document.getElementById("incidentCount");
const lastSecuritySync = document.getElementById("lastSecuritySync");
const securityFeed = document.getElementById("securityFeed");
const restoreFullscreenButton = document.getElementById("restoreFullscreen");
const acknowledgeSecurityButton = document.getElementById("acknowledgeSecurity");
const forceRecheckButton = document.getElementById("forceRecheck");
const sessionIdElement = document.getElementById("sessionId");
const sessionBlocker = document.getElementById("sessionBlocker");
const sessionMessageText = document.getElementById("sessionMessageText");
const exitSessionButton = document.getElementById("exitSession");

const responses = new Map();
const flaggedQuestions = new Set();
let flatQuestions = [];
let currentIndex = 0;
let examTimer;
let examMode = "full";
let modePayload = {};
let activeSections = examPaper.sections;
let activeDuration = examPaper.duration;
let proctorInterval;
let sessionLocked = false;

const MAX_VIOLATIONS = 5;
const securityState = {
  fullscreen: !!document.fullscreenElement,
  focus: document.hasFocus(),
  network: navigator.onLine,
  incidents: 0,
};

const sessionLockKey = "psycheprep-exam-lock";
const sessionId = (() => {
  const storageKey = "psycheprep-exam-session-id";
  try {
    const existing = sessionStorage.getItem(storageKey);
    if (existing) return existing;
    const fresh = (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
    sessionStorage.setItem(storageKey, fresh);
    return fresh;
  } catch (error) {
    return `${Date.now()}-${Math.random()}`;
  }
})();

if (sessionIdElement) {
  sessionIdElement.textContent = sessionId.slice(0, 8).toUpperCase();
}

function updateSecuritySyncTime() {
  if (lastSecuritySync) {
    lastSecuritySync.textContent = new Date().toLocaleTimeString();
  }
}

function setBanner(type, message) {
  if (!securityBanner) return;
  securityBanner.textContent = message;
  securityBanner.hidden = false;
  securityBanner.className = `security-banner${type ? ` ${type}` : ""}`;
}

function clearBanner() {
  if (!securityBanner) return;
  securityBanner.hidden = true;
  securityBanner.textContent = "";
  securityBanner.className = "security-banner";
}

function updateStatusIndicators() {
  if (fullscreenStatus) {
    fullscreenStatus.textContent = securityState.fullscreen ? "Secured" : "Lost";
  }
  if (focusStatus) {
    focusStatus.textContent = securityState.focus ? "Active" : "Suspended";
  }
  if (networkStatus) {
    networkStatus.textContent = securityState.network ? "Online" : "Offline";
  }
  if (incidentDisplay) {
    incidentDisplay.textContent = securityState.incidents;
  }
}

function appendSecurityFeed(label, message) {
  if (!securityFeed) return;
  const entry = document.createElement("li");
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${label}: ${message}`;
  securityFeed.prepend(entry);
  while (securityFeed.childElementCount > 8) {
    securityFeed.removeChild(securityFeed.lastElementChild);
  }
}

function triggerLockdown(reason) {
  if (sessionLocked) return;
  sessionLocked = true;
  setBanner("danger", reason);
  appendSecurityFeed("Lockdown", reason);
  document.body.classList.add("session-locked");
  if (sessionMessageText) {
    sessionMessageText.textContent = reason;
  }
  if (sessionBlocker) {
    sessionBlocker.hidden = false;
  }
}

function logIncident(label, message, severity = "warning") {
  securityState.incidents += severity === "danger" ? 2 : 1;
  updateStatusIndicators();
  appendSecurityFeed(label, message);
  setBanner(severity === "danger" ? "danger" : "warning", `${label}: ${message}`);
  updateSecuritySyncTime();
  if (securityState.incidents >= MAX_VIOLATIONS) {
    triggerLockdown("Multiple security violations detected. Exam attempt frozen.");
  } else {
    setTimeout(() => {
      if (!sessionLocked) {
        clearBanner();
      }
    }, 4000);
  }
}

function enforceFullscreen() {
  if (document.fullscreenElement) return;
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen().catch(() => {
      logIncident("Fullscreen", "User declined fullscreen request", "warning");
    });
  }
}

function releaseSessionLock() {
  try {
    const stored = localStorage.getItem(sessionLockKey);
    if (stored === sessionId) {
      localStorage.removeItem(sessionLockKey);
    }
  } catch (error) {
    // ignore storage failures
  }
}

function claimSessionLock() {
  try {
    const existing = localStorage.getItem(sessionLockKey);
    if (existing && existing !== sessionId) {
      triggerLockdown("Another active session is already running for this candidate.");
      return false;
    }
    localStorage.setItem(sessionLockKey, sessionId);
    return true;
  } catch (error) {
    logIncident("Storage", "Unable to secure session lock", "warning");
    return true;
  }
}

function runSecurityAudit({ forceLog = false } = {}) {
  securityState.fullscreen = !!document.fullscreenElement;
  securityState.focus = document.hasFocus();
  securityState.network = navigator.onLine;
  updateStatusIndicators();

  if (!securityState.fullscreen) {
    if (forceLog) {
      appendSecurityFeed("Audit", "Awaiting fullscreen confirmation");
    } else {
      logIncident("Fullscreen", "Exam window exited fullscreen", "danger");
    }
  } else if (forceLog) {
    appendSecurityFeed("Audit", "Fullscreen verified");
  }

  if (!securityState.focus) {
    logIncident("Focus", "Window lost focus", "warning");
  } else if (forceLog) {
    appendSecurityFeed("Audit", "Focus stable");
  }

  if (!securityState.network) {
    logIncident("Network", "Connection offline", "danger");
  } else if (forceLog) {
    appendSecurityFeed("Audit", "Network healthy");
  }

  updateSecuritySyncTime();
}

function initProctoring() {
  if (!claimSessionLock()) {
    return;
  }

  enforceFullscreen();
  runSecurityAudit({ forceLog: true });
  setBanner("", "Secure exam mode initialised. Proctoring active.");
  setTimeout(() => {
    if (!sessionLocked) {
      clearBanner();
    }
  }, 4000);

  document.addEventListener("fullscreenchange", () => {
    securityState.fullscreen = !!document.fullscreenElement;
    if (!securityState.fullscreen) {
      logIncident("Fullscreen", "User exited fullscreen", "danger");
      enforceFullscreen();
    } else {
      appendSecurityFeed("Fullscreen", "Restored");
      updateStatusIndicators();
    }
  });

  window.addEventListener("blur", () => {
    securityState.focus = false;
    logIncident("Focus", "Window blurred", "warning");
  });

  window.addEventListener("focus", () => {
    securityState.focus = true;
    updateStatusIndicators();
    appendSecurityFeed("Focus", "Window refocused");
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      securityState.focus = false;
      logIncident("Visibility", "Tab hidden", "warning");
    }
  });

  window.addEventListener("offline", () => {
    securityState.network = false;
    logIncident("Network", "Connectivity lost", "danger");
  });

  window.addEventListener("online", () => {
    securityState.network = true;
    appendSecurityFeed("Network", "Connectivity restored");
    updateStatusIndicators();
  });

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    logIncident("Context Menu", "Right click blocked", "warning");
  });

  document.addEventListener("copy", (event) => {
    event.preventDefault();
    logIncident("Clipboard", "Copy action prevented", "warning");
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && ["c", "x", "v", "p", "s", "u"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      logIncident("Shortcut", `Blocked ${event.key.toUpperCase()} shortcut`, "warning");
    }
    if (event.key === "PrintScreen") {
      event.preventDefault();
      logIncident("Shortcut", "Print screen disabled", "warning");
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key === sessionLockKey && event.newValue && event.newValue !== sessionId) {
      triggerLockdown("Another location resumed this exam. Current attempt halted.");
    }
  });

  proctorInterval = setInterval(() => {
    if (!sessionLocked) {
      runSecurityAudit();
    } else if (proctorInterval) {
      clearInterval(proctorInterval);
    }
  }, 45000);
}

if (exitSessionButton) {
  exitSessionButton.addEventListener("click", () => {
    releaseSessionLock();
    window.location.href = "index.html";
  });
}

if (restoreFullscreenButton) {
  restoreFullscreenButton.addEventListener("click", () => {
    enforceFullscreen();
    appendSecurityFeed("Fullscreen", "Manual fullscreen request");
  });
}

if (acknowledgeSecurityButton) {
  acknowledgeSecurityButton.addEventListener("click", () => {
    clearBanner();
    if (securityFeed) {
      Array.from(securityFeed.children).forEach((entry) => {
        entry.classList.add("muted");
      });
    }
  });
}

if (forceRecheckButton) {
  forceRecheckButton.addEventListener("click", () => {
    runSecurityAudit({ forceLog: true });
  });
}

window.addEventListener("beforeunload", () => {
  releaseSessionLock();
});

window.addEventListener("pagehide", () => {
  releaseSessionLock();
});

function loadModeFromStorage() {
  examMode = localStorage.getItem("psycheprep-exam-mode") || "full";
  try {
    modePayload = JSON.parse(localStorage.getItem("psycheprep-exam-payload")) || {};
  } catch (error) {
    modePayload = {};
  }
}

function cloneSections(sections) {
  return sections.map((section) => ({
    ...section,
    questions: section.questions.map((question) => ({ ...question })),
  }));
}

function deriveSectionsForMode() {
  const sections = cloneSections(examPaper.sections);
  let duration = examPaper.duration;

  if (examMode === "weak") {
    const storedWeak = modePayload.topics || JSON.parse(localStorage.getItem("psycheprep-weak-topics") || "null");
    const topics = storedWeak && storedWeak.length ? storedWeak : weakTopicInsights.slice(0, 2).map((item) => item.topic);
    const filtered = sections
      .map((section) => ({
        ...section,
        questions: section.questions.filter((question) => topics.includes(question.topic)),
      }))
      .filter((section) => section.questions.length > 0);
    if (filtered.length) {
      duration = Math.max(30, filtered.reduce((count, section) => count + section.questions.length, 0) * 4);
      return { sections: filtered, duration };
    }
  }

  if (examMode === "pyq") {
    const filtered = sections
      .map((section) => ({
        ...section,
        questions: section.questions.filter((question) => {
          if (question.source !== "PYQ") return false;
          const yearMatch = modePayload.year ? question.year === modePayload.year : true;
          const topicMatch = modePayload.topic ? question.topic === modePayload.topic : true;
          return yearMatch && topicMatch;
        }),
      }))
      .filter((section) => section.questions.length > 0);
    if (filtered.length) {
      duration = Math.max(30, filtered.reduce((count, section) => count + section.questions.length, 0) * 3);
      return { sections: filtered, duration };
    }
  }

  if (examMode === "custom") {
    const blueprint = modePayload.blueprint || (function () {
      try {
        return JSON.parse(localStorage.getItem("psycheprep-custom-blueprint"));
      } catch (error) {
        return null;
      }
    })();
    if (blueprint) {
      const chapters = new Set(blueprint.chapters);
      const questions = sections
        .flatMap((section) => section.questions)
        .filter((question) => !chapters.size || chapters.has(question.chapter))
        .slice(0, blueprint.questionCount || sections.length * 10);
      if (questions.length) {
        duration = blueprint.duration || Math.max(30, questions.length * 3);
        return {
          sections: [
            {
              id: "custom-mix",
              title: "Custom Mix",
              questions,
            },
          ],
          duration,
        };
      }
    }
  }

  return { sections, duration };
}

function flattenQuestions() {
  flatQuestions = [];
  activeSections.forEach((section, sectionIndex) => {
    section.questions.forEach((question, index) => {
      flatQuestions.push({
        sectionId: section.id,
        sectionTitle: section.title,
        sectionIndex,
        sectionQuestionNumber: index + 1,
        sectionTotal: section.questions.length,
        question,
      });
    });
  });
}

function renderQuestionPalette() {
  questionList.innerHTML = "";
  flatQuestions.forEach((entry, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = index + 1;
    button.dataset.index = index.toString();
    button.dataset.status = responses.has(entry.question.id)
      ? "attempted"
      : flaggedQuestions.has(entry.question.id)
      ? "flagged"
      : "pending";
    if (index === currentIndex) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => navigateTo(index));
    questionList.appendChild(button);
  });
}

function updateCounters() {
  attemptedCount.textContent = responses.size;
  flaggedCount.textContent = flaggedQuestions.size;
  pendingCount.textContent = Math.max(0, flatQuestions.length - responses.size);
}

function renderQuestion(index) {
  currentIndex = index;
  const entry = flatQuestions[index];
  if (!entry) return;
  questionTitle.textContent = `Question ${index + 1}`;
  const sourceLabel = entry.question.source === "PYQ"
    ? `PYQ ${entry.question.year || ""}`.trim()
    : "Mock Bench";
  questionMeta.textContent = `${entry.sectionTitle} • ${sourceLabel} • Difficulty: ${entry.question.difficulty}`;
  sectionProgress.textContent = `Section ${entry.sectionIndex + 1} of ${activeSections.length} • Question ${entry.sectionQuestionNumber}/${entry.sectionTotal}`;

  questionContent.innerHTML = `
    <p>${entry.question.text}</p>
    <ul>
      ${entry.question.options
        .map((option, optionIndex) => {
          const checked = responses.get(entry.question.id) === optionIndex ? "checked" : "";
          return `<li><label><input type="radio" name="response" value="${optionIndex}" ${checked}/> ${option}</label></li>`;
        })
        .join("")}
    </ul>
  `;

  questionContent.querySelectorAll('input[name="response"]').forEach((input) => {
    input.addEventListener("change", (event) => {
      const value = Number(event.target.value);
      responses.set(entry.question.id, value);
      flaggedQuestions.delete(entry.question.id);
      renderQuestionPalette();
      updateCounters();
    });
  });

  document.querySelectorAll(".palette-grid button").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.index) === currentIndex);
  });
}

function navigateTo(index) {
  renderQuestion(index);
}

function startTimer(durationMinutes = activeDuration) {
  clearInterval(examTimer);
  let remainingSeconds = durationMinutes * 60;
  function tick() {
    const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(remainingSeconds % 60).padStart(2, "0");
    timeRemaining.textContent = `${hours}:${minutes}:${seconds}`;
    if (remainingSeconds === 0) {
      clearInterval(examTimer);
      openSubmitDialog();
      return;
    }
  }
  tick();
  examTimer = setInterval(() => {
    remainingSeconds -= 1;
    if (remainingSeconds < 0) {
      remainingSeconds = 0;
    }
    tick();
  }, 1000);
}

function markForReview() {
  const questionId = flatQuestions[currentIndex].question.id;
  flaggedQuestions.add(questionId);
  renderQuestionPalette();
  updateCounters();
}

function clearResponse() {
  const questionId = flatQuestions[currentIndex].question.id;
  responses.delete(questionId);
  renderQuestionPalette();
  updateCounters();
  renderQuestion(currentIndex);
}

function openSubmitDialog() {
  dialogPending.textContent = flatQuestions.length - responses.size;
  dialog.hidden = false;
}

function closeSubmitDialog() {
  dialog.hidden = true;
}

function submitExam() {
  closeSubmitDialog();
  const score = Array.from(responses.entries()).reduce((total, [questionId, answer]) => {
    const entry = flatQuestions.find((item) => item.question.id === questionId);
    return total + (entry?.question.answer === answer ? 1 : 0);
  }, 0);
  alert(`Exam submitted! Raw score: ${score} / ${flatQuestions.length}`);
  releaseSessionLock();
}

document.getElementById("nextQuestion").addEventListener("click", () => {
  if (currentIndex < flatQuestions.length - 1) {
    navigateTo(currentIndex + 1);
  }
});

document.getElementById("prevQuestion").addEventListener("click", () => {
  if (currentIndex > 0) {
    navigateTo(currentIndex - 1);
  }
});

document.getElementById("markReview").addEventListener("click", markForReview);

document.getElementById("clearResponse").addEventListener("click", clearResponse);

document.getElementById("submitExam").addEventListener("click", openSubmitDialog);

document.querySelector('[data-action="close-dialog"]').addEventListener("click", closeSubmitDialog);

document.querySelector('[data-action="confirm-submit"]').addEventListener("click", submitExam);

function updateModeUi() {
  const modeLabel = document.getElementById("activeMode");
  const summary = document.getElementById("modeSummary");
  const highlights = document.getElementById("modeHighlights");

  const titles = {
    full: "Full Mock",
    weak: "Weak Focus",
    pyq: "PYQ Only",
    custom: "Custom Mix",
  };

  if (modeLabel) {
    modeLabel.textContent = `Mode: ${titles[examMode] || "Full Mock"}`;
  }

  const highlightItems = [];
  if (examMode === "full") {
    summary.textContent = "Full mock selected.";
    highlightItems.push("Balanced across all sections", "Scoring mirrors NTA pattern");
  } else if (examMode === "weak") {
    const topics = (modePayload.topics && modePayload.topics.length
      ? modePayload.topics
      : weakTopicInsights.slice(0, 2).map((item) => item.topic)
    ).join(", ");
    summary.textContent = `Targeting weak pockets: ${topics}`;
    highlightItems.push("Adaptive timer tuned for mastery", "Analytics exported to mentor deck");
  } else if (examMode === "pyq") {
    summary.textContent = "Past Year drill activated.";
    if (modePayload.year) {
      highlightItems.push(`Pinned to ${modePayload.year}`);
    }
    if (modePayload.topic) {
      highlightItems.push(`Focused on ${modePayload.topic}`);
    }
    highlightItems.push("Only NTA verified archives", "Solutions unlock post submission");
  } else if (examMode === "custom") {
    const blueprint = modePayload.blueprint || (function () {
      try {
        return JSON.parse(localStorage.getItem("psycheprep-custom-blueprint"));
      } catch (error) {
        return null;
      }
    })();
    summary.textContent = blueprint
      ? `Learner blueprint • ${blueprint.questionCount} Qs in ${blueprint.duration} mins`
      : "Awaiting blueprint.";
    if (blueprint) {
      highlightItems.push(`Chapters: ${blueprint.chapters.join(", ") || "Mixed"}`);
    }
    highlightItems.push("Difficulty blend honoured", "Review tagged to analytics");
  }

  if (highlights) {
    highlights.innerHTML = "";
    highlightItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      highlights.appendChild(li);
    });
  }
}

function applyMode() {
  loadModeFromStorage();
  const { sections, duration } = deriveSectionsForMode();
  activeSections = sections;
  activeDuration = duration;
  responses.clear();
  flaggedQuestions.clear();
  flattenQuestions();
  if (!flatQuestions.length) {
    activeSections = examPaper.sections;
    activeDuration = examPaper.duration;
    flattenQuestions();
  }
  currentIndex = 0;
  renderQuestionPalette();
  renderQuestion(0);
  updateCounters();
  updateModeUi();
}

function persistMode(mode, payload = {}) {
  localStorage.setItem("psycheprep-exam-mode", mode);
  if (Object.keys(payload).length) {
    localStorage.setItem("psycheprep-exam-payload", JSON.stringify(payload));
  } else {
    localStorage.removeItem("psycheprep-exam-payload");
  }
  examMode = mode;
  modePayload = payload;
}

function activateMode(mode, payload = {}) {
  persistMode(mode, payload);
  applyMode();
  startTimer(activeDuration);
}

initProctoring();
if (!sessionLocked) {
  applyMode();
  startTimer(activeDuration);
}

document.getElementById("cycleMode").addEventListener("click", () => {
  const order = ["full", "weak", "pyq", "custom"];
  const currentIndex = order.indexOf(examMode);
  const nextMode = order[(currentIndex + 1) % order.length];
  const payload =
    nextMode === "weak"
      ? { topics: weakTopicInsights.slice(0, 2).map((item) => item.topic) }
      : nextMode === "pyq"
      ? {}
      : nextMode === "custom"
      ? modePayload.blueprint
        ? { blueprint: modePayload.blueprint }
        : {}
      : {};
  activateMode(nextMode, payload);
});

document.getElementById("resetMode").addEventListener("click", () => {
  persistMode("full");
  applyMode();
  startTimer(activeDuration);
});
