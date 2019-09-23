var router = require('express').Router();

router.get("/", (req, res) => {
    res.render("index");
});  

router.get("/create", (req, res) => {
    res.render("cadastro");
});

module.exports = router;