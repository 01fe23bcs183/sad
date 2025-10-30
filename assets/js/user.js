import { initThemeControls } from "./theme.js";
import { initPaymentButtons, getPayments, observePayments } from "./payment.js";
import {
  learnerAttempts,
  learnerResources,
  learnerSchedule,
  paymentHistory,
  weakTopicInsights,
  chapterPools,
  pyqCatalog,
} from "./data.js";

initThemeControls();
initPaymentButtons();

const learnerName = document.getElementById("learnerName");
if (learnerName) {
  const name = localStorage.getItem("psycheprep-learner-name") || "Ritika";
  learnerName.textContent = name;
}

function renderAttempts() {
  const tableBody = document.querySelector("#attemptTable tbody");
  tableBody.innerHTML = "";
  learnerAttempts.forEach((attempt) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${attempt.mock}</td>
      <td>${attempt.date}</td>
      <td>${attempt.score}</td>
      <td>${attempt.percentile}</td>
      <td><button class="ghost-button" data-action="review" data-id="${attempt.id}">Review</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function renderSchedule() {
  const container = document.getElementById("scheduleList");
  container.innerHTML = "";
  learnerSchedule.forEach((slot) => {
    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = `
      <div>
        <strong>${slot.title}</strong>
        <p class="muted">${slot.date} • ${slot.time}</p>
      </div>
      <button class="ghost-button" data-action="remind" data-id="${slot.id}">Remind</button>
    `;
    container.appendChild(item);
  });
}

function renderResources() {
  const grid = document.getElementById("resourceGrid");
  grid.innerHTML = "";
  learnerResources.forEach((resource) => {
    const card = document.createElement("div");
    card.className = "resource-card";
    card.innerHTML = `
      <div>
        <strong>${resource.title}</strong>
        <p class="muted">${resource.type} • ${resource.tag}</p>
      </div>
      <button class="ghost-button" data-action="open-resource" data-id="${resource.id}">Open</button>
    `;
    grid.appendChild(card);
  });
}

function renderPayments() {
  const tableBody = document.querySelector("#paymentTable tbody");
  tableBody.innerHTML = "";
  const storedPayments = [...paymentHistory, ...getPayments()];
  storedPayments.forEach((txn) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${txn.date}</td>
      <td>${txn.plan}</td>
      <td>₹${txn.amount}</td>
      <td>${txn.status}</td>
      <td><button class="ghost-button" data-action="invoice" data-id="${txn.id}">Invoice</button></td>
    `;
    tableBody.appendChild(row);
  });
}

renderAttempts();
renderSchedule();
renderResources();
renderPayments();
renderWeakTopics();
renderChapterChecklist();
renderPyqList();
hydratePyqFilters();

observePayments(() => {
  renderPayments();
});

const summaryMetrics = {
  latestScore: document.querySelector('[data-metric="latest-score"]'),
  accuracy: document.querySelector('[data-metric="accuracy"]'),
  avgTime: document.querySelector('[data-metric="avg-time"]'),
  confidence: document.querySelector('[data-metric="confidence"]'),
};

if (summaryMetrics.latestScore) {
  summaryMetrics.latestScore.textContent = learnerAttempts[0]?.score ?? 0;
  summaryMetrics.accuracy.textContent = "82%";
  summaryMetrics.avgTime.textContent = "1.6 min";
  summaryMetrics.confidence.textContent = "74%";
}

function setExamMode(mode, payload = {}) {
  localStorage.setItem("psycheprep-exam-mode", mode);
  if (Object.keys(payload).length) {
    localStorage.setItem("psycheprep-exam-payload", JSON.stringify(payload));
  } else {
    localStorage.removeItem("psycheprep-exam-payload");
  }
}

function renderWeakTopics() {
  const tbody = document.querySelector("#weakTopicList tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  weakTopicInsights.forEach((insight) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${insight.topic}</td>
      <td>${Math.round(insight.confidence * 100)}%</td>
      <td>${insight.probableQuestionType}</td>
      <td>
        <button class="ghost-button" data-action="focus-topic" data-topic="${insight.topic}">Focus Next Exam</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  tbody.querySelectorAll("[data-action='focus-topic']").forEach((button) => {
    button.addEventListener("click", (event) => {
      const topic = event.currentTarget.dataset.topic;
      setExamMode("weak", { topics: [topic] });
      localStorage.setItem("psycheprep-weak-topics", JSON.stringify([topic]));
      alert(`Weak topic focus locked for ${topic}. Launch exam to drill it now.`);
    });
  });
}

function renderChapterChecklist() {
  const container = document.getElementById("chapterChecklist");
  if (!container) return;
  container.innerHTML = "";
  chapterPools.forEach((pool) => {
    const wrapper = document.createElement("label");
    wrapper.className = "checkbox";
    wrapper.innerHTML = `
      <input type="checkbox" name="chapter" value="${pool.chapter}" />
      <span>${pool.chapter}</span>
      <small>${Math.round(pool.suggestedWeight * 100)}% target • Avg ${pool.averageScore}%</small>
    `;
    container.appendChild(wrapper);
  });

  const storedBlueprint = localStorage.getItem("psycheprep-custom-blueprint");
  if (storedBlueprint) {
    const blueprint = JSON.parse(storedBlueprint);
    container.querySelectorAll("input[name='chapter']").forEach((input) => {
      input.checked = blueprint.chapters.includes(input.value);
    });
    const form = document.getElementById("mixForm");
    if (form && blueprint) {
      form.questions.value = blueprint.questionCount;
      form.duration.value = blueprint.duration;
      form.difficulty.value = blueprint.difficulty;
      updateBuilderStatus(`Synced • ${new Date(blueprint.generatedAt).toLocaleString()}`);
    }
  }
}

function updateBuilderStatus(message) {
  const badge = document.getElementById("builderStatus");
  if (badge) {
    badge.textContent = message;
  }
}

const mixForm = document.getElementById("mixForm");
if (mixForm) {
  mixForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(mixForm);
    const chapters = formData.getAll("chapter");
    const questionCount = Number(formData.get("questions"));
    const duration = Number(formData.get("duration"));
    const difficulty = formData.get("difficulty");

    const blueprint = {
      chapters,
      questionCount,
      duration,
      difficulty,
      generatedAt: new Date().toISOString(),
    };

    localStorage.setItem("psycheprep-custom-blueprint", JSON.stringify(blueprint));
    setExamMode("custom", { blueprint });
    updateBuilderStatus("Blueprint ready • Auto-synced");
    alert("Custom blueprint generated. Exam player will honour this mix.");
  });

  mixForm.querySelector("[data-action='reset-blueprint']").addEventListener("click", () => {
    localStorage.removeItem("psycheprep-custom-blueprint");
    setExamMode("full");
    mixForm.reset();
    renderChapterChecklist();
    updateBuilderStatus("Reset");
  });
}

function renderPyqList(filters = {}) {
  const tbody = document.querySelector("#pyqList tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  pyqCatalog
    .filter((pyq) => {
      const yearMatch = filters.year ? pyq.year === Number(filters.year) : true;
      const topicMatch = filters.topic ? pyq.topic === filters.topic : true;
      return yearMatch && topicMatch;
    })
    .forEach((pyq) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pyq.year}</td>
        <td>${pyq.topic}</td>
        <td>${pyq.difficulty}</td>
        <td>${pyq.source}</td>
      `;
      tbody.appendChild(row);
    });
}

function hydratePyqFilters() {
  const yearSelect = document.getElementById("pyqYear");
  const topicSelect = document.getElementById("pyqTopic");
  if (!yearSelect || !topicSelect) return;

  const years = Array.from(new Set(pyqCatalog.map((item) => item.year))).sort((a, b) => b - a);
  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });

  const topics = Array.from(new Set(pyqCatalog.map((item) => item.topic))).sort();
  topics.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
}

const pyqControls = document.querySelector("[data-action='launch-pyq']");
if (pyqControls) {
  pyqControls.addEventListener("click", () => {
    const year = document.getElementById("pyqYear").value;
    const topic = document.getElementById("pyqTopic").value;
    renderPyqList({ year, topic });
    setExamMode("pyq", { year: year ? Number(year) : null, topic: topic || null });
    alert("PYQ mode armed. Launch exam to attempt filtered archive questions.");
  });
}

document.querySelectorAll("[data-action='clear-pyq']").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("pyqYear").value = "";
    document.getElementById("pyqTopic").value = "";
    renderPyqList();
    setExamMode("pyq", {});
  });
});

document.querySelectorAll("[data-action='refresh-insights']").forEach((button) => {
  button.addEventListener("click", () => {
    updateBuilderStatus("Insights refreshed");
    renderWeakTopics();
  });
});
