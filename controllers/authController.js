const Usuario = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt= require('jsonwebtoken');

exports.autenticarUsuario = async (req,res) =>{

      //Revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

        //extraer mail y password
    const {email, password}= req.body;

    try {
        //Verificar que el usuario existe
        let usuario= await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({msg: 'No existe un usuario registrado con ese email en el sistema'})
        }

        //Verificar que el password es correcto
            
            //Comparar password del req con el almacenado en db
        const passwordCorrecto = bcryptjs.compare(password, usuario.password);

        if(!passwordCorrecto){
            return res.status(400).json({msg: `La contraseña es incorrecta`});
        }

        //Si todo es correcto crear y firmar el jwt
        const payload= {
            id:usuario.id
        };

            //firmar el token
        jwt.sign(payload,process.env.SECRETA,{expiresIn:3600 //1 hora
        },(error,token)=>{

            if(error)throw error;

            //mensaje de confirmacion
            res.json({token});
        });

        
    
    } catch (error) {
        console.log(error);
    
    }

}