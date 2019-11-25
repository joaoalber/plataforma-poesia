const router = require('express').Router();
const queries = require('../../db/queries');
const passport = require('passport');

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
    queries.usuario.delete(req.params.id);
    return res.render('index.ejs');
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


router.get("/usuario/:id", (req, res) => {
    return res.render('profile');
})

router.get('/edit/:id', (req,res) => {
    queries.usuario.readOne(req.params.id).then(usuario => {
        nome = usuario[0].nome;
        email = usuario[0].email;
        sobrenome = usuario[0].sobrenome;
        return res.render('cadastro', {nome})
    });
    
});

router.post('/edit/:id', (req, res) => {
    queries.usuario.update(req.params.id, req.body);
    return res.render('index.ejs');
});


router.get("/login", (req, res) => {
    return res.render('login');
})

router.get("/feed", (req, res) => {
    return res.render('feed');
})

router.post("/login/auth", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/feed",
        failureRedirect: "/login",
        failureFlash: "Nome ou senha inválido", 
        successFlash: "Bem vindo!"
    })(req, res, next);
});

module.exports = router;