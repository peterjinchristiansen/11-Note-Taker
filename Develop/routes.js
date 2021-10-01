const express = require('express');
const router = express.Router();
const database = require('./db/db.json')
const fs = require('fs');
const uuid = require('uuid');

console.log(database)


router.get('/', (req, res) => {
    res.json(database)
})

router.post('/', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    }

    database.push(newNote);

    fs.writeFile('db/db.json', JSON.stringify(database), function() {});

    res.json(database);
})

router.delete('/:id', (req, res) => {
    const thisObject = database.findIndex(x => x.id === req.params.id)
    database.splice(thisObject, 1);
    res.json(database);
})



module.exports = router;