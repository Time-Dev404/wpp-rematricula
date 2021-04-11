
exports.up = function(knex) {
  return knex.schema.createTable('students', function(table) {
    table.increments('id').primary();
    table.string('name').nullable();
    table.string('cpf').unique();
    table.string('registration').nullable();
    table.string('address').nullable();
    table.string('city').nullable();
    table.string('phone').nullable();
    table.string('email').nullable();
    table.string('chat_id');

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('students')
};
