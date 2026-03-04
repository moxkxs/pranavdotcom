/*
 * components.js — shared header, footer, social icons
 *
 * Root pages:   <header id="site-header"></header>
 *               <div id="site-footer"></div>
 *
 * Subdirectory: <header id="site-header" data-depth="1"></header>
 *               <div id="site-footer" data-depth="1"></div>
 */
(function () {
    var header = document.getElementById('site-header');
    var footer = document.getElementById('site-footer');
    var depth = 0;
    if (header && header.dataset.depth) depth = parseInt(header.dataset.depth);
    else if (footer && footer.dataset.depth) depth = parseInt(footer.dataset.depth);
    var p = '../'.repeat(depth);

    var pages = [
        ['home',      'index.html'],
        ['writing',   'writing.html'],
        ['projects',  'projects.html'],
        ['bookshelf', 'bookshelf.html']
    ];

    var socials = [
        { label: 'Twitter',  href: 'https://x.com/pbkandlakunta?lang=en',
          d: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/pranavkandlakunta',
          d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
          extra: '<rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>' },
        { label: 'GitHub',   href: 'https://github.com/moxkxs',
          d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
        { label: 'Email',    href: 'mailto:pby5ws@virginia.edu',
          d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
          extra: '<polyline points="22,6 12,13 2,6"></polyline>' }
    ];

    function svg(s) {
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + s.d + '"></path>' + (s.extra || '') + '</svg>';
    }

    function navHTML() {
        return pages.map(function (pg) {
            return '<a href="' + p + pg[1] + '">' + pg[0] + '</a>';
        }).join('');
    }

    function socialHTML() {
        return socials.map(function (s) {
            var ext = s.href.indexOf('mailto') === 0 ? '' : ' target="_blank"';
            return '<a href="' + s.href + '"' + ext + ' aria-label="' + s.label + '">' + svg(s) + '</a>';
        }).join('');
    }

    if (header) {
        header.innerHTML = '<h1 class="logo">pranavdotcom</h1><nav>' + navHTML() + '</nav>';
    }
    if (footer) {
        footer.innerHTML =
            '<div class="separator"></div>' +
            '<nav class="footer-nav">' + navHTML() + '</nav>' +
            '<div class="social-icons">' + socialHTML() + '</div>';
    }
})();
