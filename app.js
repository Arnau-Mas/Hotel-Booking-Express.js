const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const hotelControllers = require("./controllers/hotelControllers");
const adminControllers = require("./controllers/AdminControllers");
const bookingControllers = require("./controllers/bookingControllers");
const DataBase = require('./database/database');

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000
)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.get('/favicon.ico', (req, res) => res.status(204).send());
app.use("/", hotelControllers);
app.use("/admin", adminControllers);
app.use("/booking", bookingControllers);
app.use((req,res)=>{
    res.status(404).send("<h1>Error 404: Pàgina no disponible</h1>")
})

//Le pasamos una funcion para que cuando se conecte, la invoque y nos "devuelva" el control
DataBase.connect(function(){ //aquesta funcio es el cb() que hem creat a database
    app.listen(app.get("port"));
});

/* 
També podria ser 
function levantarApp(){
    app.listen(3000);

    DataBase.connect(levantarApp); 

    al final levantarApp es la funcio q introduim en el parametre cb
} */