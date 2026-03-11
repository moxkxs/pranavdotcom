/*
 * projects.js — reads projects.json and renders project cards
 *
 * Projects page: renders all visible projects as cards
 *                into #projects-list
 */
(function () {
    var container = document.getElementById('projects-list');
    if (!container) return;

    var prefix = '';
    var depth = document.getElementById('site-header');
    if (depth && depth.dataset.depth) {
        prefix = '../'.repeat(parseInt(depth.dataset.depth, 10));
    }

    fetch(prefix + 'data/projects.json')
        .then(function (res) { return res.json(); })
        .then(function (projects) {
            // Filter visible, sort newest first
            projects = projects.filter(function (p) { return p.visible !== false; });
            projects.sort(function (a, b) {
                return b.date.localeCompare(a.date);
            });

            container.innerHTML = projects.map(function (proj) {
                // Format date: "2026-01" → "January 2026"
                var months = ['January','February','March','April','May','June',
                              'July','August','September','October','November','December'];
                var d = proj.date.split('-');
                var dateStr = months[parseInt(d[1], 10) - 1] + ' ' + d[0];

                var detailsHTML = '';
                if (proj.details && proj.details.length) {
                    detailsHTML = '<ul class="project-card-details">' +
                        proj.details.map(function (li) {
                            return '<li>' + li + '</li>';
                        }).join('') +
                        '</ul>';
                }

                var tagsHTML = '';
                if (proj.tags && proj.tags.length) {
                    tagsHTML = '<div class="project-card-meta">' +
                        proj.tags.map(function (t) {
                            return '<span class="project-tag">' + t + '</span>';
                        }).join('') +
                        '</div>';
                }

                return '<a href="' + prefix + 'projects/' + proj.slug + '.html" class="project-card">' +
                    '<div class="project-card-body">' +
                    '<h3 class="project-card-title">' + proj.title + '</h3>' +
                    '<p class="project-card-date">' + dateStr + '</p>' +
                    '<p class="project-card-summary">' + proj.summary + '</p>' +
                    detailsHTML +
                    tagsHTML +
                    '</div></a>';
            }).join('');
        })
        .catch(function (err) {
            console.error('Failed to load projects:', err);
        })
        .then(function () {
            document.body.classList.add('ready');
        });
})();
