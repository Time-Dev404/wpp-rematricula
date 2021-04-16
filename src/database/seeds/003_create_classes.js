
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {id: 1, year: '2019', course_id: 1},
        {id: 2, year: '2020', course_id: 1},
        {id: 3, year: '2021', course_id: 1},
        {id: 4, year: '2019', course_id: 2},
        {id: 5, year: '2020', course_id: 2},
        {id: 6, year: '2021', course_id: 2},
        {id: 7, year: '2019', course_id: 3},
        {id: 8, year: '2020', course_id: 3},
        {id: 9, year: '2021', course_id: 3},
        {id: 10, year: '2019', course_id: 4},
        {id: 11, year: '2020', course_id: 4},
        {id: 12, year: '2021', course_id: 4},
        {id: 13, year: '2019', course_id: 5},
        {id: 14, year: '2020', course_id: 5},
        {id: 15, year: '2021', course_id: 5},
        {id: 16, year: '2019', course_id: 6},
        {id: 17, year: '2020', course_id: 6},
        {id: 18, year: '2021', course_id: 6},
        {id: 19, year: '2019', course_id: 7},
        {id: 20, year: '2020', course_id: 7},
        {id: 21, year: '2021', course_id: 7},
      ]);
    });
};
