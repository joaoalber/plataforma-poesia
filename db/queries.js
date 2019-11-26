const knex = require('./knex');
const bcrypt = require('bcrypt');

const encrypt = (dados) => {
    return bcrypt.hash(dados, 10);
}

module.exports = {
    usuario: {
        create: function(usuario) {
            encrypt(usuario.senha).then((senhaCriptografada) => {
                return knex('usuario').insert({nome: usuario.nome, email: usuario.email,
                    sobrenome: usuario.sobrenome, senha: senhaCriptografada});
            });
        },
        delete: function(id) {
            return knex('usuario').where('id', id).del().then(() => { });
        },
        readAll: function() {
            return knex('usuario');
        },
        readOne: function(id) {
            return knex('usuario').where('id', id);
        },
        update: function(id, usuario) {
            encrypt(usuario.senha).then((senhaCriptografada) => {
                return knex('usuario').where('id', id).update({
                    nome: usuario.nome,
                    email: usuario.email,
                    sobrenome: usuario.sobrenome,
                    senha: senhaCriptografada
                })
            });
        },
        findUser: function(email) {
            return knex('usuario').where('email', email);
        },
        changePassword: function(email, password){
            
            return knex('usuario').where('email', email).update({
                email: email,
                senha: 123456
            }) 
        }
    }
    

}