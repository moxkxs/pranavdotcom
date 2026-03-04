/*
 * posts.js — reads posts.json and renders post listings
 *
 * Home page:    renders up to 3 most recent as title—line—date rows
 *               into #recent-posts-list
 *
 * Writing page: renders all posts as full cards with summary
 *               into #all-posts-list
 */
(function () {
    var recentContainer = document.getElementById('recent-posts-list');
    var allContainer = document.getElementById('all-posts-list');
    if (!recentContainer && !allContainer) return;

    // Determine path prefix (posts.json is always at root)
    var prefix = '';
    var depth = document.getElementById('site-header');
    if (depth && depth.dataset.depth) {
        prefix = '../'.repeat(parseInt(depth.dataset.depth, 10));
    }

    fetch(prefix + 'posts.json')
        .then(function (res) { return res.json(); })
        .then(function (posts) {
            // Sort newest first
            posts.sort(function (a, b) {
                return b.date.localeCompare(a.date);
            });

            // Home page: up to 3 recent posts as rows
            if (recentContainer) {
                var recent = posts.slice(0, 3);
                recentContainer.innerHTML = recent.map(function (post) {
                    var d = post.date.split('-');
                    var dateStr = d[1] + '.' + d[2] + '.' + d[0].slice(2);
                    return '<article class="post-entry">' +
                        '<a href="' + prefix + 'posts/' + post.slug + '.html" class="post-link-row">' +
                        '<span class="post-row-title">' + post.title + '</span>' +
                        '<span class="post-row-line"></span>' +
                        '<span class="post-row-date">' + dateStr + '</span>' +
                        '</a></article>';
                }).join('');
            }

            // Writing page: all posts as full cards
            if (allContainer) {
                allContainer.innerHTML = posts.map(function (post) {
                    // Format date as "Month Day, Year"
                    var months = ['January','February','March','April','May','June',
                                  'July','August','September','October','November','December'];
                    var d = post.date.split('-');
                    var dateStr = months[parseInt(d[1], 10) - 1] + ' ' + parseInt(d[2], 10) + ', ' + d[0];
                    return '<article class="post-entry">' +
                        '<a href="' + prefix + 'posts/' + post.slug + '.html" class="post-link">' +
                        '<h3 class="post-title">' + post.title + '</h3>' +
                        '<p class="post-date">' + dateStr + '</p>' +
                        '<p class="post-summary">' + post.summary + '</p>' +
                        '</a></article>';
                }).join('');
            }
        })
        .catch(function (err) {
            console.error('Failed to load posts:', err);
        });
})();
