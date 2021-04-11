exports.up = function(knex) {
  return knex.schema.createTable('teaching', function(table) {
    table.increments('id').primary();
    table.string('name').nullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('teaching')
};
