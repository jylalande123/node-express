const express = require('express');
const Joi = require('joi');
const Lessons = require('../models/dbHelpers.js');

const router = express.Router(); // create the router

// already in /api/lessons do not repeat in the api

router.get('/', (req,res) => {
    // need to do the validate of req.body first
    
    Lessons.find()
    .then(lessons => {
        res.status(200).json(lessons);
    })
    .catch(error => {
        res.status(500).json({message: "cannot find lessons"});
    });
});

router.get('/:id', (req,res) => {
    // need to do the validate of req.body first
    const { id} = req.params;

    Lessons.findById(id)
    .then(lesson => {
        if (lesson) {
            res.status(200).json(lesson);
        } else {
            res.status(404).json({message: 'Record not found'});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform the operation"});
    });
});

router.post('/', (req,res) => {
    // need to do the validate of req.body first
    
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson);
    })
    .catch(error => {
        res.status(500).json({message: "cannot add lesson"});
    });
});

router.delete('/:id', (req,res) => {
    // need to do the validate of req.body first
    const {id} = req.params;

    Lessons.remove(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'record deleted' });
            } else {
                res.status(404).json({ message: 'No records deleted' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: { error } });
        });

});

router.patch('/:id', (req,res) => {
    // need to do the validate of req.body first
    const {id} = req.params;
    const changes = req.body;

    Lessons.update(id, changes)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson);
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: { error } });
        });

});


router.post('/:id/message', (req,res) => {
    // need to do the validate of req.body first
    
    const {id} = req.params;
    const msg = req.body;

    if (!msg.lesson_id) { // check if the lesson id is in the body
        msg["lesson_id"] = parseInt(id,10);
    }

    Lessons.findById(id)
    .then(lesson => { // check to see if the id exist
        if (!lesson) {
            res.status(404).json({message: "Invalid ID"});
        }
        // check for all requires fields
        if (!msg.sender || !msg.text) {
            res.status(400).json({messageL: "Must provide a sender and a text"});
        }
        Lessons.addMessage(msg,id)
        .then(message => {
          res.status(200).json(message);
        })
        .catch ( error => {
            res.status(500).json({message: {error}});
        })
    })
    .catch(error => {
        res.status(500).json({message: "Error finding lesson"});
    })
    
});

router.get('/:id/messages', (req,res) => {
    const { id } = req.params;
    
    Lessons.findLessonMessages(id)
    .then( lessons => {
        res.status(200).json(lessons);
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve the messages"});
    });

});

module.exports = router;