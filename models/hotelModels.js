const { urlencoded } = require("express");
const mongoose=require("mongoose"); //Aqui tornem a requerir mongoose
//definim l'esquema
const hotelRoomSchema = new mongoose.Schema({ //creem esquema
    title: String,
    price: Number,
    meters: Number,
    photos:[{}], //Array de objetos se define así. Si quisiera objeto sería {}
    downDate:Date, //Si aixo tingues un valor en el document llavors significaria q l'hotel no esta disponible. mirar apunts
    services:[],
    reserves:[{type: mongoose.Schema.Types.ObjectId, ref:"Bookings"}]
}) 
//l'associem a un model 
const HotelRoom = mongoose.model("Rooms", hotelRoomSchema); //associem l'schema a un model

//exportar el model
module.exports = HotelRoom;


// HotelRoom --> .model te crea una instancia de la clase model. Se encarga de relacionar el esquema del dominio con la coleccion Apartments en base de datos. Establece los mecanismos suficientes y necesarios para ofrecer la mismas funcionalidades que el driver nativo de mongodb) el cual tiene funciones como el .find y demás que nos permitirá acceder a la base de datos tal como hacemos en en los controllers