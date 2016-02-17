
exports.up = function(knex) {
  return knex.schema
  	.createTable('Person', function (table){
  		table.bigincrements('id').primary();
  		table.string('firstName');
  		table.string('lastname');
  		table.string('username');
  		table.string('password');
  		table.boolean('isAdmin');
  	});
};

exports.down = function(knex) {
  return knex.schema
  	.dropTableIfExists('Person');
};
