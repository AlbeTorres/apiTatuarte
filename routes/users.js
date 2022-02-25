//Rutas para crear usuarios
const express = require('express');
const router= express.Router();
const usuarioController= require('../controllers/userscontroller');
const {check} = require('express-validator');

//Crea un usuario
//api/usuarios
router.post('/',[
    check('nombre','El nombre no puede estar vacio').not().isEmpty(),
    check('email','Ingrese un email válido').isEmail(),
    check('password',' La contraseña debe tener como mínimo 8 caracteres').isLength({min:8})
],
    usuarioController.crearUsuario
);

module.exports= router;