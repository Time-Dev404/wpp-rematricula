
exports.up = function(knex) {
  return knex.schema.createTable('students', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('cpf');
    table.string('registration');
    table.string('address');
    table.string('city');
    table.string('phone');
    table.string('email');
    table.string('chat_id');

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('students')
};
