// where we write our knex queries
const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

// add new functions to this list to be published
module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    addMessage,
    findMessageById,
    findLessonMessages,
    removeMessage
};

// add, find, findById, remove, update

async function add(lesson) {
    const [id] =await db('lessons').insert(lesson);
    return id;
}

async function find() {
    return db('lessons'); //return all rows from the table
}

function findById(id) {
    return db('lessons')
    .where ({id : id})
    .first();
}

async function remove(id) {

    return db('Lessons')
    .where ({id:id})
    .del();
}

function update(id, changes) {
    return db("lessons")
        .where({id : id})
 //       .update(changes, [id])
        .update(changes) // does the update and returns the updated resord
        .then ( () => {
            return findById(id);
        });
}

function findMessageById(id) {
    return db("messages")
    .where({id})
    .first();
}

function findLessonMessages(lesson_id) {
    return db("lessons as l")
    .join("messages as m", "l.id","m.lesson_id")
    .select("l.id as LessonID",
    "l.name as LessonName",
    "m.id as MessageID",
    "m.sender",
    "m.text")
    .where({lesson_id});
}

async function addMessage(message, lesson_id) {
    const [id] = await db("messages")
    .where({lesson_id})
    .insert(message);
    return findMessageById(id);
}

function removeMessage(id) {
    return db("messages")
    .where({ id })
    .del();
}