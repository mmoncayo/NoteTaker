// DEPENDENCIES
// ================================================================================

// establishes the path npm package to get the correct file path for the html
var path = require("path");

// ROUTING
// ================================================================================

// html get requests when the user visits a page
module.exports = function (app) {

    // should return the notes.html file webpage 
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    // should return the main webpage (index.html)
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};