const express = require('express');
const mysql =require('mysql2');
const api = express();
require('dotenv').config();

api.use(express.json());
const db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password :'',
    database : 'restaurante_ecommerce'
});

db.connect((error)=>{
    if(error){
        console.error('Eror al conectar:',error);
        return;
    }
    console.log('Conexion exitosa');
}); 

api.get('/',(request, results)=>{
    results.send("<h1>Api con express</h1>")
})

api.get('/productos', (request,results)=>{
    db.query('SELECT * FROM productos',(err,resultados)=>{
        if(err){
            results.status(500).json({message : err.message })
            return;
        }
        results.json(resultados);
    });

});


const PORT = 3306;
api.listen(PORT,()=>{
    console.log('Servidor escuchando el puerto 3306');
});