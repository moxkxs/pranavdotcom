module.exports = function (eleventyConfig) {
    // Passthrough copy — static assets go straight to _site/
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
    eleventyConfig.addPassthroughCopy({ "src/favicon.png": "favicon.png" });
    eleventyConfig.addPassthroughCopy({ "src/apple-touch-icon.png": "apple-touch-icon.png" });
    eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

    // Custom filter: collect unique tags from an array of items
    eleventyConfig.addFilter("uniqueTags", function (items) {
        var tagSet = new Set();
        (items || []).forEach(function (item) {
            (item.tags || []).forEach(function (tag) {
                tagSet.add(tag);
            });
        });
        return Array.from(tagSet).sort();
    });

    // Custom filter: filter to visible items only
    eleventyConfig.addFilter("visible", function (items) {
        return (items || []).filter(function (item) {
            return item.visible !== false;
        });
    });

    // Custom filter: filter by status
    eleventyConfig.addFilter("byStatus", function (items, status) {
        return (items || []).filter(function (item) {
            return item.status === status;
        });
    });

    // Custom filter: sort by date string descending
    eleventyConfig.addFilter("sortByDate", function (items) {
        return (items || []).slice().sort(function (a, b) {
            return b.date.localeCompare(a.date);
        });
    });

    // Custom filter: format "2026-02-08" → "February 8, 2026"
    eleventyConfig.addFilter("postDate", function (dateStr) {
        var months = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
        var d = dateStr.split('-');
        return months[parseInt(d[1], 10) - 1] + ' ' + parseInt(d[2], 10) + ', ' + d[0];
    });

    // Custom filter: format "2026-02-08" → "02.08.26"
    eleventyConfig.addFilter("shortDate", function (dateStr) {
        var d = dateStr.split('-');
        return d[1] + '.' + d[2] + '.' + d[0].slice(2);
    });

    // Custom filter: format "2026-01" → "January 2026"
    eleventyConfig.addFilter("projectDate", function (dateStr) {
        var months = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
        var d = dateStr.split('-');
        return months[parseInt(d[1], 10) - 1] + ' ' + d[0];
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["njk", "html", "md"],
        htmlTemplateEngine: "njk"
    };
};
