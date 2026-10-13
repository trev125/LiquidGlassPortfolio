// Runs in <head> so the saved theme applies before first paint. With no saved choice, the page follows the system.
(function () {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const classes = { dark: 'p-dark-mode', light: 'p-light-mode' };

  function apply(theme) {
    root.classList.remove('p-auto-dark-mode', 'p-dark-mode', 'p-light-mode');
    root.classList.add(classes[theme] || 'p-auto-dark-mode');
  }

  function isDark() {
    return root.classList.contains('p-dark-mode') ||
      (root.classList.contains('p-auto-dark-mode') && media.matches);
  }

  apply(localStorage.getItem('theme'));

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('theme-toggle').addEventListener('click', function () {
      const next = isDark() ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      apply(next);
    });
  });
})();
