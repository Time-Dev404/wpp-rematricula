
exports.up = function(knex) {
  return knex.schema.createTable('classes', function(table) {
    table.increments('id').primary();
    table.string('year');
    table
      .integer('course_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('courses')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('classes')
};

