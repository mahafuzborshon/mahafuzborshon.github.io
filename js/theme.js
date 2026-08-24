/**
 * THEME MANAGER (Light / Dark Mode)
 * Default: Pristine White Consultancy (Light)
 */

(function () {
  const STORAGE_KEY = 'portfolio_theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  // Initialize theme from storage or default to light
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Default to light mode for the clean white aesthetic spec
    return THEME_LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update aria-label for accessibility
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.setAttribute(
        'aria-label',
        theme === THEME_DARK ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  // Apply immediately before DOM render to prevent flash
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Bind button toggle once DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme') || THEME_LIGHT;
        const nextTheme = activeTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        applyTheme(nextTheme);
      });
    }
  });
})();
