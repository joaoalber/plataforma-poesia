var router = require('express').Router();

router.get("/", UsuarioController.index);  

module.exports = router;