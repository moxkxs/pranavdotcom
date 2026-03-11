/*
 * theme-toggle.js — click handler for the theme toggle button
 * Icons are both in the DOM; CSS shows/hides based on [data-theme]
 */
(function () {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
        var isLight = document.documentElement.getAttribute('data-theme') === 'light';
        var next = isLight ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch(e) {}
        if (window.updateDotColor) window.updateDotColor();
    });
})();
