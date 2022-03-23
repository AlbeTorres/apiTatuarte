//Rutas para crear usuarios
const express = require('express');
const router= express.Router();
const usuarioController= require('../controllers/userscontroller');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//Crea un usuario
//api/usuarios
router.post('/',[
    check('nombre','El nombre no puede estar vacio').not().isEmpty(),
    check('email','Ingrese un email válido').isEmail(),
    check('password',' La contraseña debe tener como mínimo 8 caracteres').isLength({min:8})
],
    usuarioController.crearUsuario
);

//Obtiene todos los usuarios
//obtiene un usuario filtrado /usuario?_id=id
router.get('/',auth,usuarioController.obtenerUsuarios);

//modifica un usuario por id
router.patch('/:id',auth,[
    check('nombre','El nombre no puede estar vacio').not().isEmpty(),
    check('password',' La contraseña debe tener como mínimo 8 caracteres').isLength({min:8}),
    check('provincia', 'La provincia no debe estar vacía').not().isEmpty(),
    check('municipio', 'El municipio no debe estar vacío').not().isEmpty()
], usuarioController.modificarUsuario);

//elimina un usuario por id
router.delete('/:id',auth,usuarioController.eliminarUsuario);


module.exports= router;