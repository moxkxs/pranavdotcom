/* theme-init.js — load before body renders to prevent flash */
(function () {
    try {
        var t = localStorage.getItem('theme');
        if (t) document.documentElement.setAttribute('data-theme', t);
    } catch(e) {}
})();
