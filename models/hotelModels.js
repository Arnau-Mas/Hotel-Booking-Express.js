const { urlencoded } = require("express");
const mongoose=require("mongoose"); //Aqui tornem a requerir mongoose
//definim l'esquema
const hotelRoomSchema = new mongoose.Schema({ //creem esquema
    title: String,
    price: Number,
    meters: Number,
    mainphoto: String,
    mainphotozone:String,
    photo1url:String,
    photo1zone:String,
    photo2url:String,
    photo2zone:String,
    photo3url:String,
    photo3zone:String,
}) 
//l'associem a un model
const HotelRoom = mongoose.model("Rooms", hotelRoomSchema); //associem l'schema a un model

//exportar el model
module.exports = HotelRoom;