/*
 * toc.js — active section highlighting for blog post sidebar
 * Include on any page with .post-toc and .post-body h3[id]
 */
document.addEventListener('DOMContentLoaded', function () {
    var tocLinks = document.querySelectorAll('.post-toc a');
    var sections = document.querySelectorAll('.post-body h3[id]');
    if (!tocLinks.length || !sections.length) return;

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
