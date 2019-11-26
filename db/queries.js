const knex = require('./knex');
const bcrypt = require('bcrypt');
var senhaDecriptada = [];
var cont = 1;

const encrypt = (dados) => {
    return bcrypt.hash(dados, 10);
}

const senhaDescriptografada = (senha, cont) => {
    senhaDecriptada[cont] = senha;
    cont++;
}

module.exports = {
    usuario: {
        senha: function(id) {
            return senhaDecriptada[id]
        },
        create: function(usuario) {
            console.log(usuario);
            senhaDescriptografada(usuario.senha, cont);
            encrypt(usuario.senha).then((senhaCriptografada) => {
                return knex('usuario').insert({nome: usuario.nome, email: usuario.email,
                    sobrenome: usuario.sobrenome, senha: senhaCriptografada});
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