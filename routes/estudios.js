//Rutas para crear estudios
const express = require('express');
const router= express.Router();
const estudioController= require('../controllers/estudioController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//api/estudios

//Crea un estudio
router.post('/',auth,[
    check('nombre','El nombre no puede estar vacio').not().isEmpty(),
    check('email','Ingrese un email válido').isEmail(),
    check('movil',' Ingrese un número de telefono válido').isLength({min:8}),
    check('provincia',' La Provincia no puede estar vacía').not().isEmpty(),
    check('municipio',' El municipio no puede estar vacío').not().isEmpty()
    
],
    estudioController.crearEstudio
);

//Obtener todos los estudios
//obtienes estudidos filtrados /estudios?provincia=provinciaBuscar
//obtienes estudidos filtrados /estudios?municipio=municipioBuscar
router.get('/',estudioController.obtenerEstudios);


//Actualizar un estudio
router.patch('/:id',auth,[
    check('nombre','El nombre no puede estar vacio').not().isEmpty(),
    check('email','Ingrese un email válido').isEmail(),
    check('movil',' Ingrese un número de telefono válido').isLength({min:8})
], 
    estudioController.actualizarEstudio
);

//Eliminar un estudio
router.delete('/:id',auth, estudioController.eliminarEstudio);


module.exports= router;




//No se usa
/*Obtener estudios por provincia
router.get('/:provincia', auth, estudioController.obtenerEstudiosProvincia);

//Obtener estudios por municipio
router.get('/:municipio', auth, estudioController.obtenerEstudiosMunicipio);*/
