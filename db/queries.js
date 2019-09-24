const knex = require('./knex');

module.exports = {
    usuario: {
        create: function(usuario) {
            knex('usuario').insert({nome: usuario.nome, email: usuario.email, 
            sobrenome: usuario.sobrenome, senha: usuario.senha}).then(()=>{});
        }
    }
}