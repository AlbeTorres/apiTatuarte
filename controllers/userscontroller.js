const Usuario = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt= require('jsonwebtoken');

exports.crearUsuario= async(req,res)=>{

    //Revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //extraer mail y password
    const {email, password}= req.body;

    try {
        let usuario= await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }

        //crea nuevo user
        usuario = new Usuario(req.body);

        //hashear el password
        const salt = await bcryptjs.genSalt(10);

        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //crear y firmar el jwt
        const payload= {
            usuario:{id:usuario.id}
        };

        //firmar el token
        jwt.sign(payload,process.env.SECRETA,{expiresIn:3600 //1 hora
        },(error,token)=>{

            if(error)throw error;

            //mensaje de confirmacion
            res.json({token});
        });

        console.log('Usuario creado correctamente');

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'hubo un error'});
        
    }
}