const router = require('express').Router();
const queries = require('../../db/queries');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
var flash = require('connect-flash');
require('../../config/auth')(passport);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: "plataformapoesia",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/create", (req, res) => {
    res.render("cadastro");
});

router.post("/create", (req, res) => {
    queries.usuario.create(req.body);
    return res.render('index.ejs');
});

router.get("/delete/:id", (req, res) => {
    return queries.usuario.delete(req.params.id);
    //return res.render('index.ejs');
})

router.get("/show", (req, res) => {
    queries.usuario.readAll().then(usuario => {
        return res.json(usuario);
    });
});

router.get("/show/:id", (req, res) => {
    queries.usuario.readOne(req.params.id).then(usuario => {
        return res.json(usuario);
    });
});

router.get("/login", (req, res) => {
    return res.render('login');
})

router.post("/login/auth", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    })(req, res, next);
});

/*
router.get('/edit/:id', (req,res) => {
    queries.usuario.update(req.params.id).then
});*/

module.exports = router;