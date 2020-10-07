const express = require('express');
const Joi = require('joi');
const Lessons = require('../models/dbHelpers.js');

const router = express.Router(); // create the router

// Already in /api/messages do not repeat in API. just use

router.delete('/:id', (req,res) => {
    const { id} = req.params;
    Lessons.removeMessage(id)
    .then (count => {
        if (count > 0) {
            res.status(200).json({message: `Message with id ${id} was deleted`});
            // have to use the accent grave for the imbeded code to work ${id}
        } else {
            res.status(404).json({message: 'No message with that id'});
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Unable to delete message'})
    })
});

module.exports = router;