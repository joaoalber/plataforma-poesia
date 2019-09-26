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

/*router.delete("/delete/{id}", (req, res) => {
    queries.usuario.delete(id);
    return res.render('index.ejs');
});*/

router.get("/show", (req, res) => {
    queries.usuario.readAll().then(usuario => {
        res.json(usuario);
    });
});

module.exports = router;