
exports.up = function(knex) {
    return knex.schema.createTable('lessons', tbl => {
        tbl.increments();
        tbl.text('name',128).notNullable();
        tbl.timestamps(true,true);
    })
    .createTable('messages', tbl => {
        tbl.increments();
        tbl.string('sender').notNullable().index();
        tbl.text('text').notNullable();
        tbl.timestamps(true,true);
        tbl.integer('lesson_id').unsigned()
        .notNullable()
        .references('id')
        .inTable('lessons')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages').dropTableIfExists('lessons');
};
