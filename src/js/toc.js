/*
 * toc.js — auto-generated table of contents with active section highlighting
 * Include on any page with .post-toc and .post-body h3[id]
 */
document.addEventListener('DOMContentLoaded', function () {
    var toc = document.querySelector('.post-toc');
    var sections = document.querySelectorAll('.post-body h3[id]');
    if (!toc || !sections.length) return;

    // Auto-generate TOC links from headings
    for (var i = 0; i < sections.length; i++) {
        var link = document.createElement('a');
        link.href = '#' + sections[i].id;
        link.textContent = sections[i].textContent;
        toc.appendChild(link);
    }

    var tocLinks = toc.querySelectorAll('a');

    function updateActive() {
        var current = '';
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].getBoundingClientRect().top < 120) {
                current = sections[i].id;
            }
        }
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            current = sections[sections.length - 1].id;
        }
        for (var j = 0; j < tocLinks.length; j++) {
            tocLinks[j].classList.remove('active');
            if (tocLinks[j].getAttribute('href') === '#' + current) {
                tocLinks[j].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', updateActive);
    updateActive();
});
