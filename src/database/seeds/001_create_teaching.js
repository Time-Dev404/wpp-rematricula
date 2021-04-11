
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teaching').del()
    .then(function () {
      // Inserts seed entries
      return knex('teaching').insert([
        {id: 1, name: 'Técnico'},
        {id: 2, name: 'Superior'},
      ]);
    });
};
