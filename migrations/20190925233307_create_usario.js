exports.up = function(knex) {
   return knex.schema.createTable("usuario", (table) => {
      table.increments();
      table.string("nome").notNullable();
      table.string("sobrenome").notNullable();
      table.string("email").notNullable();
      table.string("senha").notNullable();
      table.timestamps(true, true);
   })
};

exports.down = function(knex) {
   return knex.schema.dropTable("usuario");
};
