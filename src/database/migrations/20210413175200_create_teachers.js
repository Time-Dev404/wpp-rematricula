
exports.up = function(knex) {
  return knex.schema.createTable('teachers', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('teachers')
};
