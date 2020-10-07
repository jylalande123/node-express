const express = require('express');

const lessonsRouter = require("../routes/lessons-routes");
const messagesRouter = require("../routes/messages-router");

const server = express();

server.use(express.json()); // middle ware How to parse JSON

server.get('/', (req,res) => {
    res.json({message: 'Where is Thor'});
});


server.use('/api/lessons', lessonsRouter);
server.use('/api/messages', messagesRouter);

module.exports = server;