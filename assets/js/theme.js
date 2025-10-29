const THEME_KEY = "psycheprep-theme";

export function applyStoredTheme(root = document.documentElement) {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") {
    root.dataset.theme = stored;
  }
}

export function toggleTheme(root = document.documentElement) {
  const current = root.dataset.theme === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
  return next;
}

export function initThemeControls(selector = "#themeToggle") {
  applyStoredTheme();
  document.querySelectorAll(selector).forEach((control) => {
    control.addEventListener("click", () => {
      const mode = toggleTheme();
      control.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
    });
  });
}
