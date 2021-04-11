
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('courses').del()
    .then(function () {
      // Inserts seed entries
      return knex('courses').insert([
        {id: 1, name: 'Administração - Proeja', teaching_id: 1},
        {id: 2, name: 'Edificações - Integrado', teaching_id: 1},
        {id: 3, name: 'Eletroeletrônica - Integrado', teaching_id: 1},
        {id: 4, name: 'Eletromecânica - Integrado', teaching_id: 1},
        {id: 5, name: 'Logística - Integrado', teaching_id: 1},
        {id: 6, name: 'Informática - Integrado', teaching_id: 1},
        {id: 7, name: 'Informática - Subsequente (Noturno)', teaching_id: 1},
        {id: 8, name: 'Administração', teaching_id: 2},
        {id: 9, name: 'Engenharia da Computação', teaching_id: 2},
        {id: 10, name: 'Construção de Edifícios', teaching_id: 2},
        {id: 11, name: 'Física', teaching_id: 2},
      ]);
    });
};
