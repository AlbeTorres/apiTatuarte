const mongoose = require('mongoose');

const TrabajoSchema= mongoose.Schema({
    img:{
        type:String,
        require:true
    },
    estudio:{
        type:mongoose.Schema.Types.ObjectId
    }

});

module.exports = mongoose.model('Trabajo',TrabajoSchema);