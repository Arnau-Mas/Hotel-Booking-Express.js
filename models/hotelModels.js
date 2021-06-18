const { urlencoded } = require("express");
const mongoose=require("mongoose"); //Aqui tornem a requerir mongoose
//definim l'esquema
const hotelRoomSchema = new mongoose.Schema({ //creem esquema
    title: String,
    price: Number,
    meters: Number,
    photos:[{}], //Array de objetos se define así. Si quisiera objeto sería {}
    downDate:Date //Si aixo tingues un valor en el document llavors significaria q l'hotel no esta disponible. mirar apunts
}) 
//l'associem a un model
const HotelRoom = mongoose.model("Rooms", hotelRoomSchema); //associem l'schema a un model

//exportar el model
module.exports = HotelRoom;