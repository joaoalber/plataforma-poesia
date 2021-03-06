const router = require('express').Router();
const queries = require('../../db/queries');
const passport = require('passport');

router.get('/forgot', function(req, res, next) {
    return res.render('forgot', { });
})

router.get("/", (req, res) => {
    return res.render("index");
});

router.get("/create", (req, res) => {
    action = '/create'
    return res.render("cadastro",{action});
});

router.post("/create", (req, res) => {
    queries.usuario.create(req.body);
    return res.render('index.ejs');
});

router.delete("/delete/:id", (req, res) => {
    queries.usuario.delete(req.params.id)
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
        sobrenome = usuario[0].sobrenome
        senha = queries.usuario.senha(req.params.id);
        action = '/edit/' + req.params.id + '?_method=PUT'
        return res.render('cadastro', {nome, email, sobrenome, senha, action})
    });
    
});

router.put('/edit/:id', (req, res) => {
    
    queries.usuario.update(req.params.id, req.body);
    return res.render('index')  
});

router.post('/forgot', function(req, res, next) {
    queries.usuario.findUser(req.body.email).then((usuario) => {
      const newpass = generatePassword()
      queries.usuario.changePassword(req.body.email, newpass)
      require('../../mail')(req.body.email, 'Sua nova senha do chat', 'Olá ' + usuario[0].nome + ', sua nova senha é ' + newpass)
      res.redirect('/')
    }).catch(err => { 
        console.error(err)
        res.redirect('/')//manda pro login mesmo que não ache
    });
  });

  function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


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