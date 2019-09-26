const router = require('express').Router();
const queries = require('../../db/queries');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

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

/*router.get('/edit/:id', (req,res) => {
    queries.usuario.update(req.params.id).then
});*/

module.exports = router;