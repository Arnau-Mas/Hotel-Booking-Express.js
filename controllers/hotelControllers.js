const express = require('express');
const HotelRoom = require('../models/hotelModels');
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


module.exports = router;