
exports.up = function(knex) {
  return knex.schema.createTable('subjects', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('workload').notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('subjects')
};
