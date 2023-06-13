const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Route 1 : Get all the notes using : GET "api/notes/fetchnotes" login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error : ");
    }
})

//Route 2 : Adding a new note using : POST "api/notes/addnote" login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title.').isLength({ min: 3 }),   //express Validators
    body('description', 'Description must be 5 characters long.').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //if there are errors return Bad Request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();
        res.json(savednote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error : ");
    }
})

//Route 3 : Updating a note using : PUT "api/notes/updatenote" login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a New Note object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find The note to be udated and update it...            
    let note = await Note.findById(req.params.id);

    if (!note) { return res.status(404).send("Not Found."); }       //to check note exists or not

    if (note.user.toString() != req.user.id) { return res.status(401).send("Access denied..."); } //to check whether the user is trying to access his note ?

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({note});

})

module.exports = router;