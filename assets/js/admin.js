import { initThemeControls } from "./theme.js";
import {
  tests,
  learners,
  paymentHistory,
  weakTopicInsights,
  chapterPools,
  pyqCatalog,
  aiSignals,
} from "./data.js";
import { getPayments, observePayments } from "./payment.js";

initThemeControls();

const metrics = {
  learners: document.querySelector('[data-metric="learners"]'),
  tests: document.querySelector('[data-metric="tests"]'),
  score: document.querySelector('[data-metric="score"]'),
  revenue: document.querySelector('[data-metric="revenue"]'),
};

function hydrateMetrics() {
  metrics.learners.textContent = learners.length;
  metrics.tests.textContent = tests.length;
  const avgScore = Math.round(
    learners.reduce((sum, learner) => sum + learner.score, 0) / learners.length
  );
  metrics.score.textContent = `${avgScore}`;
  const revenue = [...paymentHistory, ...getPayments()].reduce((sum, txn) => sum + txn.amount, 0);
  metrics.revenue.textContent = revenue.toLocaleString("en-IN");
}

function renderWeakTopics() {
  const tbody = document.querySelector("#weakTopicTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  weakTopicInsights.forEach((insight) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${insight.topic}</td>
      <td>${Math.round(insight.confidence * 100)}%</td>
      <td>${insight.probableQuestionType}</td>
      <td>${insight.recommendation}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderBlueprints() {
  const container = document.getElementById("blueprintGrid");
  if (!container) return;
  let blueprint = null;
  const storedBlueprint = localStorage.getItem("psycheprep-custom-blueprint");
  if (storedBlueprint) {
    try {
      blueprint = JSON.parse(storedBlueprint);
    } catch (error) {
      blueprint = null;
    }
  }
  container.innerHTML = "";

  chapterPools.forEach((pool) => {
    const card = document.createElement("article");
    card.className = "insight-card";
    card.innerHTML = `
      <header>
        <h3>${pool.chapter}</h3>
        <span class="badge">${Math.round(pool.suggestedWeight * 100)}% target</span>
      </header>
      <p class="muted">Avg Score ${pool.averageScore}% • ${pool.recentPYQCount} recent PYQs</p>
      <p>Recommended questions in next mix: ${Math.max(1, Math.round(pool.suggestedWeight * 25))}</p>
    `;
    container.appendChild(card);
  });

  if (blueprint) {
    const card = document.createElement("article");
    card.className = "insight-card highlight";
    card.innerHTML = `
      <header>
        <h3>Learner Blueprint</h3>
        <span class="badge">${blueprint.difficulty.toUpperCase()}</span>
      </header>
      <p class="muted">${new Date(blueprint.generatedAt).toLocaleString()}</p>
      <p>Chapters: ${blueprint.chapters.join(", ") || "None selected"}</p>
      <p>Questions: ${blueprint.questionCount} • Time Target: ${blueprint.duration} mins</p>
    `;
    container.appendChild(card);
  }
}

function renderPyqTable() {
  const tbody = document.querySelector("#pyqTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  pyqCatalog
    .slice()
    .sort((a, b) => b.year - a.year)
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

function renderTests() {
  const tbody = document.querySelector("#testTable tbody");
  tbody.innerHTML = "";
  tests.forEach((test) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${test.name}</td>
      <td>${test.window}</td>
      <td>${test.duration}</td>
      <td><span class="badge">${test.status}</span></td>
      <td>${test.registrations}</td>
      <td><button class="ghost-button" data-action="edit" data-id="${test.id}">Edit</button></td>
    `;
    tbody.appendChild(row);
  });
}

function renderLearners() {
  const container = document.getElementById("learnerList");
  container.innerHTML = "";
  learners.forEach((learner) => {
    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = `
      <div>
        <strong>${learner.name}</strong>
        <p class="muted">Plan: ${learner.plan} • Mentor: ${learner.mentor}</p>
      </div>
      <span class="badge">Score ${learner.score}</span>
    `;
    container.appendChild(item);
  });
}

function renderBilling() {
  const tbody = document.querySelector("#billingTable tbody");
  tbody.innerHTML = "";
  const transactions = [...paymentHistory, ...getPayments()];
  transactions.forEach((txn) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${txn.date}</td>
      <td>${txn.customer || "Learner"}</td>
      <td>${txn.plan}</td>
      <td>₹${txn.amount}</td>
      <td>${txn.status}</td>
    `;
    tbody.appendChild(row);
  });
}

hydrateMetrics();
renderTests();
renderLearners();
renderBilling();
renderWeakTopics();
renderBlueprints();
renderPyqTable();

observePayments(() => {
  hydrateMetrics();
  renderBilling();
  renderBlueprints();
});

const reportCanvas = document.getElementById("reportCanvas");
if (reportCanvas) {
  reportCanvas.innerHTML = `
    <p><strong>Predicted Churn:</strong> ${(aiSignals.weeklyPredictions.churnRisk * 100).toFixed(1)}%</p>
    <p><strong>Upgrade Intent:</strong> ${(aiSignals.weeklyPredictions.upgradeIntent * 100).toFixed(1)}%</p>
    <p><strong>Mode Usage:</strong> Weak ${aiSignals.blueprintUsage.weakModeRuns}, PYQ ${aiSignals.blueprintUsage.pyqModeRuns}, Custom ${aiSignals.blueprintUsage.customMixRuns}</p>
  `;
}

const searchInput = document.getElementById("adminSearch");
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll("#learnerList .list-item").forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.hidden = !text.includes(query);
    });
  });
}

document.querySelectorAll("[data-action='push-remediation']").forEach((button) => {
  button.addEventListener("click", () => {
    alert("Remediation packs shared with mentors via in-app inbox.");
  });
});

document.querySelectorAll("[data-action='export-blueprints']").forEach((button) => {
  button.addEventListener("click", () => {
    alert("Blueprint CSV exported to analytics bucket (mock action).");
  });
});

document.querySelectorAll("[data-action='sync-pyq']").forEach((button) => {
  button.addEventListener("click", () => {
    alert("PYQ repository synced with latest NTA bulletin (mock).");
  });
});
