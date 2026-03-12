module.exports = function () {
    var writing = require('./writing.json');
    var showDrafts = process.env.DRAFTS === "true";
    var tagSet = new Set();
    writing.filter(function (item) {
        return item.visible !== false || showDrafts;
    }).forEach(function (item) {
        (item.tags || []).forEach(function (tag) { tagSet.add(tag); });
    });
    return Array.from(tagSet).sort();
};
