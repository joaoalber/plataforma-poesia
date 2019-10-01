const localStrategy = require('passport-local').Strategy
const knex = require('../db/knex')
const bcrypt = require('bcryptjs')


module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha' }, (email, senha, done) => {
        console.log(email);
        knex('usuario').where('email', email).first().then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: "Esta conta não existe" });
            }
            bcrypt.compare(senha, usuario.senha, (erro, checked) => {
                console.log(senha);
                console.log(usuario.senha);
                if (checked) {
                    return done(null, usuario);
                } else {
                    return done(null, false, { message: "Senha incorreta" })
                }
            })
        }).catch((e) => {
            console.log(e);
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        return knex('usuario').where({ id }).first()
            .then((user) => { done(null, user); })
            .catch((err) => { done(err, null); });
    });

}