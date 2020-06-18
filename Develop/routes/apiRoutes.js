// DEPENDENCIES
// ================================================================================
// establishes the package needed to read and write the notes entered
const fs = require("fs");
const path = require("path");
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// LOAD DATA
// ===============================================================================

// where the database for notes is stored
const dbFilePath = path.join(__dirname, '../db/db.json');

// ROUTING
// ===============================================================================

module.exports = function (app) {

    // API GET Requests
    // ---------------------------------------------------------------------------

    // this reads the json file and returns all of the saved notes as json 
    app.get("/api/notes", function (req, res) {
        readFile(dbFilePath, "utf8")
            .then(data => res.json(JSON.parse(data)));
    });

    // generates unique ID for every saved note
    function newID(currentNotes) {
        let highestId = 0;
        currentNotes.forEach(note => {
            if (note.id > highestId) {
                highestId = note.id;
            }
        });
        return highestId + 1;
    }

    // API POST Requests
    // -----------------------------------------------------------------------------

    // this receives the new note to save on the request body, then adds it to the db.json file (saved notes), 
    // and returns the new note to the client
    app.post("/api/notes", function (req, res) {
        readFile(dbFilePath, "utf8")
            .then(data => {
                let notes = JSON.parse(data);
                const newNote = { ...req.body, "id": newID(notes) };
                notes.push(newNote);
                writeFile(dbFilePath, JSON.stringify(notes))
                    .then(() => {
                        res.json(newNote);
                    });
            });
    });

    // API DELETE Requests
    // -----------------------------------------------------------------------------

    // this receives the saved note with the unique id that is to be deleted, then reads all the notes from db.json, 
    // removes the note with the right id, and finally re-writes the notes ot the db.json file (saved notes)
    app.delete("/api/notes/:id", function (req, res) {
        const idToBeDeleted = parseInt(req.params.id);
        readFile(dbFilePath, "utf8")
          .then(data => {
            let notes = JSON.parse(data);
            notes = notes.filter(newNote => newNote.id !== idToBeDeleted);
            writeFile(dbFilePath, JSON.stringify(notes))
              .then(() => {
                res.send('A request to delete note has been submitted.');
              });
          });
    });
};