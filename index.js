const express = require("express");
const conectarDB = require("./config/db");

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//habilitar express.js
app.use(express.json({extended:true}));

//puerto de la app
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use('/api/usuarios',require('./routes/users'));
app.use('/api/autenticar',require('./routes/auth'));
app.use('/api/estudios',require('./routes/estudios'));


//Corriendo el server
app.listen(PORT, ()=>{

    console.log(`Server corriendo en el puerto ${PORT}`);
});

