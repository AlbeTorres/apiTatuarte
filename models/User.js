const mongoose = require('mongoose');

const UsuarioSchema= mongoose.Schema({
    nombre:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        trim:true,
    },
    registro:{
        type:Date,
        default:Date.now()
    },
    provincia:{
        type:String,
        
    },
    municipio:{
        type:String,

    },

});

module.exports = mongoose.model('Usuario',UsuarioSchema);