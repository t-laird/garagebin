exports.up = function(knex, Promise) {
  return knex.schema.createTable('garage', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('reason');
    table.string('cleanliness');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('garage');
};
