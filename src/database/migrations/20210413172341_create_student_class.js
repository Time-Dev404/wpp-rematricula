
exports.up = function(knex) {
  return knex.schema.createTable('student_class', function(table) {
    table.increments('id').primary();
    table
      .integer('course_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('courses')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .integer('student_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('students')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('student_class')
};

