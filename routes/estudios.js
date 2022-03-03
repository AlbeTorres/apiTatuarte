//Rutas para crear estudios
const express = require('express');
const router= express.Router();
const estudioController= require('../controllers/estudioController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//Crea un estudio
//api/estudios
router.post('/',auth,[
    check('nombre','El nombre no puede estar vacio').not().isEmpty(),
    check('email','Ingrese un email válido').isEmail(),
    check('movil',' Ingrese un número de telefono válido').isLength({min:8})
],
    estudioController.crearEstudio
);

router.get('/',auth,
estudioController.obtenerEstudios);

module.exports= router;