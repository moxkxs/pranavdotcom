/*
 * posts.js — reads posts.json and renders post listings
 *
 * Home page:    renders up to 3 most recent as title—line—date rows
 *               into #recent-posts-list
 *
 * Writing page: renders all posts as full cards with summary
 *               into #all-posts-list, with clickable tag filters
 */
(function () {
    var recentContainer = document.getElementById('recent-posts-list');
    var allContainer = document.getElementById('all-posts-list');
    var tagContainer = document.getElementById('tag-filters');
    if (!recentContainer && !allContainer) return;

    var prefix = '';
    var depth = document.getElementById('site-header');
    if (depth && depth.dataset.depth) {
        prefix = '../'.repeat(parseInt(depth.dataset.depth, 10));
    }

    fetch(prefix + 'data/posts.json')
        .then(function (res) { return res.json(); })
        .then(function (posts) {
            posts = posts.filter(function (p) { return p.visible != false; });
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

            // Writing page: tag filters + all posts
            if (allContainer) {
                // Collect unique tags
                var tagSet = {};
                posts.forEach(function (p) {
                    (p.tags || []).forEach(function (t) { tagSet[t] = true; });
                });
                var allTags = Object.keys(tagSet).sort();

                // Render tag filter bar
                if (tagContainer && allTags.length > 0) {
                    var activeTag = null;

                    var renderTags = function () {
                        tagContainer.innerHTML =
                            '<button class="tag-filter' + (activeTag === null ? ' active' : '') +
                            '" data-tag="all">all</button>' +
                            allTags.map(function (tag) {
                                return '<button class="tag-filter' +
                                    (activeTag === tag ? ' active' : '') +
                                    '" data-tag="' + tag + '">' + tag + '</button>';
                            }).join('');
                    };

                    var renderPosts = function () {
                        var filtered = activeTag === null ? posts : posts.filter(function (p) {
                            return (p.tags || []).indexOf(activeTag) !== -1;
                        });
                        allContainer.innerHTML = filtered.map(function (post) {
                            return buildPostCard(post, prefix);
                        }).join('');
                    };

                    renderTags();
                    renderPosts();

                    tagContainer.addEventListener('click', function (e) {
                        var btn = e.target.closest('.tag-filter');
                        if (!btn) return;
                        var tag = btn.dataset.tag;
                        activeTag = tag === 'all' ? null : tag;
                        renderTags();
                        renderPosts();
                    });
                } else {
                    allContainer.innerHTML = posts.map(function (post) {
                        return buildPostCard(post, prefix);
                    }).join('');
                }
            }
        })
        .catch(function (err) {
            console.error('Failed to load posts:', err);
        });

    function buildPostCard(post, prefix) {
        var months = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
        var d = post.date.split('-');
        var dateStr = months[parseInt(d[1], 10) - 1] + ' ' + parseInt(d[2], 10) + ', ' + d[0];
        var tagsHtml = (post.tags || []).map(function (t) {
            return '<span class="post-tag">' + t + '</span>';
        }).join('');
        return '<article class="post-entry">' +
            '<a href="' + prefix + 'posts/' + post.slug + '.html" class="post-link">' +
            '<h3 class="post-title">' + post.title + '</h3>' +
            '<p class="post-date">' + dateStr + '</p>' +
            (tagsHtml ? '<div class="post-tags">' + tagsHtml + '</div>' : '') +
            '<p class="post-summary">' + post.summary + '</p>' +
            '</a></article>';
    }
})();
