const express = require('express');
const mysql =require('mysql2');
const api = express();
require('dotenv').config();

api.use(express.json());
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user : 'allnations',
    password :process.env.DB_PASSWORD,
    database : process.env.DB_NAME
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

api.get('/paises', (request,results)=>{
    db.query('SELECT * FROM countries',(err,resultados)=>{
        if(err){
            results.status(500).json({message : err.message })
            return;
        }
        results.json(resultados);
    });

});

api.get('/paises/:nombre/:id', (request,results)=>{
    const {nombre,id} = request.params;
    db.query('SELECT * FROM countries WHERE name = ?',[nombre],(err,resultados)=>{
        if(err){
            results.status(500).json({message : err.message })
            return;
        }
        results.json(resultados);
    });

});

const PORT = 3000;
api.listen(PORT,()=>{
    console.log('Servidor escuchando el puerto 3000');
});