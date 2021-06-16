const express = require("express");
const app = express();
const hotelControllers = require("./controllers/hotelControllers");
const adminControllers = require("./controllers/AdminControllers");
const DataBase = require('./database/database');

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(hotelControllers);
app.use("/admin", adminControllers);

app.use((req,res)=>{
    res.status(404).send("<h1>Error 404: Pàgina no disponible</h1>")
})

//Le pasamos una funcion para que cuando se conecte, la invoque y nos "devuelva" el control
DataBase.connect(function(){ //aquesta funcio es el cb() que hem creat a database
    app.listen(3000);
});

/* 
També podria ser 
function levantarApp(){
    app.listen(3000);

    DataBase.connect(levantarApp); 

    al final levantarApp es la funcio q introduim en el parametre cb
} */