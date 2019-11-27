const knex = require('./knex');
const bcrypt = require('bcrypt');
var senhaDecriptada = [];

const encrypt = (dados) => {
    return bcrypt.hash(dados, 10);
}

const senhaDescriptografada = (senha, id) => {
    senhaDecriptada[id] = senha;
}

module.exports = {
    usuario: {
        senha: function(id) {
            return senhaDecriptada[id]
        },
        create: function(usuario) {
            var senha = usuario.senha
            encrypt(usuario.senha).then((senhaCriptografada) => {
                return knex('usuario').insert({nome: usuario.nome, email: usuario.email,
                    sobrenome: usuario.sobrenome, senha: senhaCriptografada}).then((id) => {
                        senhaDescriptografada(senha, id);
                    });
            });
        },
        delete: function(id) {
            return knex('usuario').where('id', id).del().then(() => { 
                message = 'success';
            });
        },
        readAll: function() {
            return knex('usuario');
        },
        readOne: function(id) {
            return knex('usuario').where('id', id);
        },
        update: function(id, usuario) {
            console.log(usuario.nome)
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
                senha: password
            }) 
        }
    }
    

}