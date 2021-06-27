//Creem una altre entitat de controllers xq a booking hi haura varies opcions com cancelar un booking, editar, coses d'administració tb, etc

const express = require('express');
const HotelRoom = require("../models/hotelModels")
const Booking = require("../models/bookingModels")
const router = express.Router();

router.post("/reserve", async (req,res)=>{
    const idRoom = req.body.idRoom;
    const locatedRoom = await HotelRoom.find();
    
    const checkIn = req.body.CheckIn;
    const checkOut = req.body.CheckOut;
    console.log("checkIn:", checkIn)
    const newReserve = await new Booking({
        checkIn,
        checkOut,
        idRoom
    })
    locatedRoom.reserves = newReserve._id; //He de mirar les relacions i despres fer unpopulation de hotelbook amb el filtre de checkins
    await locatedRoom.save();
    await newReserve.save(); /* Arreglar aixo i despres continuar amb q la reserva esta ocupada, mostrar en el calendari marcada, etc */
    res.redirect("/");
})

module.exports = router; 