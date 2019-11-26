exports.up = function (knex) {
   return knex.schema.createTable("usuario", (table) => {
      table.increments("id");
      table.string("nome").notNullable();
      table.string("sobrenome").notNullable();
      table.string("email").unique().notNullable();
      table.string("senha").notNullable();
      table.timestamps();
   }).then(() => {
      return knex.schema.createTable("poesia", (table) => {
         table.increments("id");
         table.integer("autor").unsigned().notNullable();
         table.string("titulo", 30).notNullable();
         table.string("conteudo").notNullable();
         table.timestamps()

         table.foreign('autor').references('id').inTable('usuario'); // fk
      })
   }).then(() => {
      return knex.schema.createTable("post", (table) => {
         table.increments("id");
         table.integer("autor").unsigned().notNullable();
         table.string("conteudo").notNullable();
         table.timestamps();

         table.foreign('autor').references('id').inTable('usuario');
      })
   })
      
      

};

exports.down = function (knex) {
   return knex.schema.dropTable("usuario");
};
