
exports.up = function(knex) {
  return knex.schema.createTable('courses', function(table) {
    table.increments('id').primary();
    table.string('name').nullable();
    table
      .integer('teaching_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('teaching')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('courses')
};
