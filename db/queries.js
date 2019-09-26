const knex = require('./knex');

module.exports = {
    usuario: {
        create: function(usuario) {
            knex('usuario').insert({nome: usuario.nome, email: usuario.email, 
            sobrenome: usuario.sobrenome, senha: usuario.senha}).then(()=>{});
        },
        delete: function(id) {
            return knex('usuario').where('id', id).del().then(()=>{});
        },
        readAll: function() {
            return knex('usuario');
        },
        readOne: function(id) {
            return knex('usuario').where('id', id);
        },
        update: function(id) {
            return knex('usuario').where('id', id);
        }
    }
}