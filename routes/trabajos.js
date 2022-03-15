const express = require('express');
const router= express.Router();
const auth = require('../middleware/auth');
const {check} = require('express-validator');
const trabajoController= require('../controllers/trabajoController');

//api/trabajos

//Crea un trabajo
router.post('/',auth,[
    check('img','Debes añadir una imagen').not().isEmpty(),
    check('estudio','El estudio es obligatorio').not().isEmpty()
],trabajoController.crearTrabajo);

//obtener todos los trabajos

//obtener trabajos por estudios
router.get('/',trabajoController.obtenerTrabajos);


//actualizar un trabajo
router.patch('/:id',auth,[
    check('img','Debes añadir una imagen').not().isEmpty(),
    check('estudio','El estudio es obligatorio').not().isEmpty()
],trabajoController.actualizarTrabajo);

//eliminar un trabajo
router.delete('/:id',auth,trabajoController.eliminarTrabajo);

module.exports= router;