module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
    eleventyConfig.addPassthroughCopy({ "src/favicon.png": "favicon.png" });
    eleventyConfig.addPassthroughCopy({ "src/apple-touch-icon.png": "apple-touch-icon.png" });
    eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

    eleventyConfig.addFilter("findBySlug", function (items, slug) {
        return (items || []).find(function (item) {
            return item.slug === slug;
        });
    });

    eleventyConfig.addFilter("uniqueTags", function (items) {
        var tagSet = new Set();
        (items || []).forEach(function (item) {
            (item.tags || []).forEach(function (tag) { tagSet.add(tag); });
        });
        return Array.from(tagSet).sort();
    });

    eleventyConfig.addFilter("visible", function (items) {
        return (items || []).filter(function (item) {
            return item.visible !== false;
        });
    });

    eleventyConfig.addFilter("byStatus", function (items, status) {
        return (items || []).filter(function (item) {
            return item.status === status;
        });
    });

    eleventyConfig.addFilter("sortByDate", function (items) {
        return (items || []).slice().sort(function (a, b) {
            return b.date.localeCompare(a.date);
        });
    });

    eleventyConfig.addFilter("postDate", function (dateStr) {
        var months = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
        var d = dateStr.split('-');
        return months[parseInt(d[1], 10) - 1] + ' ' + parseInt(d[2], 10) + ', ' + d[0];
    });

    eleventyConfig.addFilter("shortDate", function (dateStr) {
        var d = dateStr.split('-');
        return d[1] + '.' + d[2] + '.' + d[0].slice(2);
    });

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
