//Rutas para autenticar usuarios
const express = require('express');
const router= express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth')

//Autenticar un usuario
//api/auth
router.post('/',[
    check('email','Ingrese un email válido').isEmail(),
    check('password',' La contraseña debe tener como mínimo 8 caracteres').isLength({min:8})
],authController.autenticarUsuario
    
);

//Obtener el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports= router;