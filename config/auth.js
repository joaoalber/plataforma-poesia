const localStrategy = require('passport-local').Strategy
const knex = require('../db/knex')
const bcrypt = require('bcryptjs')
const usuario = knex('usuario')

const queries = require('../db/queries');



module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha' }, (email, senha, done) => {

            queries.usuario.readAll().then(usuario => {
                console.log(usuario);
            });
        
        usuario.where('email', email).then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: "Esta conta não existe" });
            }
            bcrypt.compare(senha, usuario.senha, (erro, checked) => {
                if (checked) {
                    return done(null, usuario);
                } else {
                    return done(null, false, { message: "Senha incorreta" })
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        usuario.where((id, 'id'), (err, usuario) => {
            done(err, user)
        })
    })
}