
exports.up = function(knex) {
  return knex.schema.createTable('responsibles', function(table) {
    table.increments('id').primary();
    table.string('name').nullable();
    table.string('cpf');
    table.string('rg').nullable();
    table.string('address').nullable();
    table.string('city').nullable();
    table.string('phone').nullable();
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
  return knex.schema.dropTable('responsibles')
};
