const {URI} = process.env;
const uri=URI;

const mongoose = require("mongoose");

class DataBase{ //es fa la clase database per utilitzar-ho a app.js i fem metodes estatics pq quedi ordenat

    static connect(cb){ //cb = callback. invoca'm quan hagis acabat el q tens q fer
        mongoose.connect(uri, {
            useNewUrlParser:true, useUnifiedTopology:true
        }, (err)=>{
            if(err) throw err;
            console.log("Estem connectats correctament a la base de dades.");
            cb() //aixo de cb esta entrant com a parametre
        });
    }
}


module.exports = DataBase;
