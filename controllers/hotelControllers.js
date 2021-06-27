const express = require('express');
const HotelRoom = require('../models/hotelModels');
const Booking = require("../models/bookingModels");
const router = express.Router();

router.get("/", async (req,res)=>{
    const allRooms = await HotelRoom.find({downDate:undefined}); //per recuperar tots els documents del model HotelRoom excepte els q tenen downDate definida
    console.log("S'ha fet petició /");
    res.status(200).render("index", {
        rooms:allRooms,
        typeUser:"user", //type user per definir el tipus d'usuari i reutilitzar l'index
    });
})
router.get("/room/:idRoom", async (req,res)=>{
    console.log("peticio feta a room");
    let idRoom = req.params.idRoom;
    const locatedRoom = await HotelRoom.findById(idRoom);
    res.status(200).render("room",{
        room:locatedRoom, //FALTA FER EL ejs A LA VIEW DE ROOM
        typeUser:"user"
    })
})

router.get("/search", async (req,res)=>{
    let query = {};
    let price = req.query.price;
    if(req.query.price){
        query.price = {$lte: price}; // less than equal, precios hasta X
        console.log("LA QUERY ES:", query);
        const rooms = await HotelRoom.find(query);
        res.status(200).render("index",{
            rooms,
            typeUser:"user"
        })
    }else{
        res.redirect("/");
    }

})

router.get("/availability", async (req,res)=>{
    let checkIn = req.query.CheckIn;
    let checkOut = req.query.CheckOut;
    console.log("checkIn es:", checkIn);
    console.log("checkIn es:", checkOut); 
     const recoveredBookings = await Booking.find({
        $or: [
            { $and: [ {checkIn:{$lt:checkIn}, checkOut:{$lt:checkIn}} ] },
            { $and: [ {checkIn:{$gt:checkIn}, checkOut:{$gt:checkOut}} ] }
        ]
    }).populate("idRoom");
    let newRooms = [];
    let rooms = HotelRoom.find();
    console.log(recoveredBookings);
   console.log(newRooms);


    res.render("index", {
        rooms: recoveredBookings,/* He de recuperar primer la col·lecció de bookings i després relacionar-la */
        typeUser:"searcher"
    });
}) 
module.exports = router;