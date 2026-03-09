/*
 * bookshelf.js — reads bookshelf.json and renders three sections
 *
 * Currently Reading:  full cards with category + note    (status: "reading")
 * Up Next:            compact rows                       (status: "queue")
 * Completed:          compact rows                       (status: "completed")
 */
(function () {
    var readingContainer = document.getElementById('books-reading');
    var queueContainer = document.getElementById('books-queue');
    var completedContainer = document.getElementById('books-completed');
    if (!readingContainer && !queueContainer && !completedContainer) return;

    var prefix = '';
    var depth = document.getElementById('site-header');
    if (depth && depth.dataset.depth) {
        prefix = '../'.repeat(parseInt(depth.dataset.depth, 10));
    }

    fetch(prefix + 'bookshelf.json')
        .then(function (res) { return res.json(); })
        .then(function (books) {
            books = books.filter(function (b) { return b.visible !== false; });

            var reading = books.filter(function (b) { return b.status === 'reading'; });
            var queue = books.filter(function (b) { return b.status === 'queue'; });
            var completed = books.filter(function (b) { return b.status === 'completed'; });

            // Currently Reading — full cards
            if (readingContainer) {
                readingContainer.innerHTML = reading.map(function (book) {
                    var cats = Array.isArray(book.category) ? book.category : (book.category ? [book.category] : []);
                    var catHTML = cats.length
                        ? '<div class="book-meta">' + cats.map(function (c) {
                            return '<span class="book-category">' + c + '</span>';
                        }).join('') + '</div>'
                        : '';
                    var noteHTML = book.note
                        ? '<p class="book-note">' + book.note + '</p>'
                        : '';
                    return '<div class="book-card current-reading"><div class="book-info">' +
                        '<h4 class="book-title">' + book.title + '</h4>' +
                        '<p class="book-author">' + book.author + '</p>' +
                        catHTML + noteHTML +
                        '</div></div>';
                }).join('');
            }

            // Up Next — compact rows
            if (queueContainer) {
                queueContainer.innerHTML = queue.map(function (book) {
                    return '<div class="compact-book">' +
                        '<span class="compact-title">' + book.title + '</span>' +
                        '<span class="compact-author">— ' + book.author + '</span>' +
                        '</div>';
                }).join('');
            }

            // Completed — compact rows
            if (completedContainer) {
                completedContainer.innerHTML = completed.map(function (book) {
                    return '<div class="compact-book">' +
                        '<span class="compact-title">' + book.title + '</span>' +
                        '<span class="compact-author">— ' + book.author + '</span>' +
                        '</div>';
                }).join('');
            }
        })
        .catch(function (err) {
            console.error('Failed to load bookshelf:', err);
        });
})();
