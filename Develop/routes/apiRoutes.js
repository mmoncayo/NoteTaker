// DEPENDENCIES
// ================================================================================
// establishes the package needed to read and write the notes entered
const fs = require("fs");

// LOAD DATA
// ===============================================================================

// this is where our saved notes contain its information in the array
var savedNotes = [];

// ROUTING
// ===============================================================================

module.exports = function (app) {

    // API GET Requests
    // ---------------------------------------------------------------------------

    // this reads the json file and returns all of the saved notes as json 
    app.get("/api/notes", function (err, res) {
        try {
            // reads in db.json file (the notes saved in the json file)
            savedNotes = fs.readFileSync("./db/db.json", "utf-8");

            // parses it so the saved notes are an array of objects
            savedNotes = JSON.parse(savedNotes);
        }
        // takes care of error handling
        catch (err) {
            console.log(err);
        }
        // responds by sending the object to the browser
        res.json(savedNotes);
    });

    // API POST Requests
    // -----------------------------------------------------------------------------

    // this receives the new note to save on the request body, then adds it to the db.json file (saved notes), 
    // and returns the new note to the client
    app.post("/api/notes", function (req, res) {
        try {
            // reads the saved notes file (db.json)
            savedNotes = fs.readFileSync("./db/db.json", "utf-8");
            console.log(savedNotes);

            // this parses the date to save as an array of objects
            savedNotes = JSON.parse(savedNotes);

            // this sets a unique id to the saved notes by using its index as the id number
            req.body.id = savedNotes.length;

            // adds the newly written note into the saved notes file (db.json) as an array of note objects 
            // (the user input is the req.body) 
            savedNotes.push(req.body);

            // stringify the note so it can be written to the file
            savedNotes = JSON.stringify(savedNotes);

            // now you can write the new note into the saved notes file
            fs.writeFileSync("./db/db.json", savedNotes, "utf-8", (err) => {
                // takes care of error handling
                if (err) throw err;
            });
            // once it is written, change back to an array of objects and send it back to the browser
            res.json(JSON.parse(savedNotes));

        }
        // more error handling
        catch (err) {
            throw err;
        }
    });

    // API DELETE Requests
    // -----------------------------------------------------------------------------

    // this receives the saved note with the unique id that is to be deleted, then reads all the notes from db.json, 
    // removes the note with the right id, and finally re-writes the notes ot the db.json file (saved notes)
    app.delete("/api/notes/:id", function (req, res) {
        try {
            // reads the saved notes file (db.json)
            savedNotes = fs.readFileSync("./db/db.json", "utf-8");

            // this parses the date to save as an array of objects
            savedNotes = JSON.parse(savedNotes);

            // delete the saved note from the array of note objects by creating a remove method
            // the remove method used is an array filter that returns elements that do not match the id of the note to be deleted
            savedNotes = savedNotes.filter((note) => {
                return note.id != req.params.id;
            });
            // stringify the updated saved notes so they can be written to the db.json file
            savedNotes = JSON.stringify(savedNotes);

            // now you can re-write the saved notes back into the saved notes file updated without the deleted note
            fs.writeFileSync("./db/db.json", savedNotes, "utf-8", (err) => {
                // takes care of error handling
                if (err) throw err;
            });
        }
        // more error handling
        catch (err) {
            throw err;
        }
    });
};