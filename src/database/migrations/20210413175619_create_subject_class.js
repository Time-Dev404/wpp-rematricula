
exports.up = function(knex) {
  return knex.schema.createTable('subject_course', function(table) {
    table.increments('id').primary();
    table.string('period').notNullable();
    table
      .integer('class_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('classes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .integer('subject_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('subjects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .integer('teacher_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('teachers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('subject_course')
};

