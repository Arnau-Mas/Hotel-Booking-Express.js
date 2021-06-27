//Creem una altre entitat de controllers xq a booking hi haura varies opcions com cancelar un booking, editar, coses d'administració tb, etc

const express = require('express');
const Booking = require("../models/bookingModels")
const router = express.Router();

router.post("/reserve", async (req,res)=>{
    const idRoom = req.body.idRoom;
    const checkIn = req.body.CheckIn;
    const checkOut = req.body.CheckOut;
    console.log("checkIn:", checkIn)
    const newReserve = await new Booking({
        checkIn,
        checkOut,
        idRoom
    })
    await newReserve.save(); /* Arreglar aixo i despres continuar amb q la reserva esta ocupada, mostrar en el calendari marcada, etc */
    res.redirect("/");
})

module.exports = router; 