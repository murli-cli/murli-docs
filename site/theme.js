(function () {
  var t;
  try { t = localStorage.getItem('murli.theme') || 'dark'; } catch (e) { t = 'dark'; }
  document.documentElement.setAttribute('data-theme', t);
  window._toggleTheme = function () {
    t = t === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('murli.theme', t); } catch (e) {}
    var btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = t === 'dark' ? '☀' : '☾';
  };
}());
