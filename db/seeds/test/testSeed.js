const mockData = require('../../../mockData');

exports.seed = function(knex, Promise) {
  return knex('garage').del()
    .then(() => {
      return knex('garage').insert(mockData)
    })
    .then(() => {
      console.log('Successfully seeded test data');
    })
    .catch(error => {
      console.log(`Error seeding test data: ${error}.`);
    });
};
