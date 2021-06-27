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
    let checkInParsed = new Date(checkIn);
    let checkOutParsed = new Date(checkOut);
    console.log("*********************", typeof checkInParsed);
    console.log("EL CHECKIN PARSED:", checkInParsed);
    console.log("checkIn es:",typeof checkIn);
    console.log("checkIn es:", checkOut); 
     const recoveredRooms = await HotelRoom.find().populate("reserves");
     console.log(recoveredRooms);
     let newRooms = [];
     recoveredRooms.forEach( room =>{

         if(room.reserves.length==0){
             newRooms.push(room)
         }else{
        let contador=0;
         room.reserves.forEach(reserve =>{
            console.log("EL CHECKINPARSED ES MAYOR:", checkInParsed>reserve.checkIn);
            console.log("EL CHECKINPARSED ES MENOR:",checkInParsed<reserve.checkIn);
             console.log("fecha mongoDB es:",reserve.checkIn,"del tipo:",typeof reserve.checkIn);
             console.log("fecha busqueda usuario es:",checkIn,"del tipo:",typeof checkIn);
            if(reserve.checkIn<checkInParsed && reserve.checkOut<checkInParsed){
                console.log("coincidencia");
            }else if(reserve.checkIn>checkOutParsed && reserve.checkOut>checkOutParsed){
                console.log("coincidencia");
            }else{
                contador++;
            }
         })
         if(contador==0){
            newRooms.push(room);
            contador==0;
           }
        }
     })
   console.log("Les newRooms*****************", newRooms);

    res.render("index", {
        rooms: newRooms,/* He de recuperar primer la col·lecció de bookings i després relacionar-la */
        typeUser:"user"
    });
}) 
module.exports = router;

/* 
router.get("/availability", async (req,res)=>{
    let checkIn = req.query.CheckIn;
    let checkOut = req.query.CheckOut;
    console.log("checkIn es:", checkIn);
    console.log("checkIn es:", checkOut); 
     const recoveredRooms = await HotelRoom.find().populate("reserves");
     console.log(recoveredRooms);
     let newRooms = [];
     recoveredRooms.forEach( room =>{
         if(room.reserves.length==0){
             newRooms.push(room)
         }else{
         room.reserves.forEach(reserve =>{
            let fechaIn =`${reserve.checkIn.getFullYear()}-${reserve.checkIn.getMonth()}-${reserve.checkIn.getDate()}`;
            let fechaOut=`${reserve.checkOut.getFullYear()}-${reserve.checkOut.getMonth()}-${reserve.checkOut.getDate()}`;
            console.log("la fechaIn es:", fechaIn);
            console.log("la fechaOut es:", fechaOut);
            console.log("la checkIn es", checkIn);
            console.log("la checkOut es:", checkOut);
            console.log(fechaIn<checkIn);
            console.log(fechaOut<checkOut);
            if(fechaIn<checkIn && fechaOut<checkIn ){
                newRooms.push({room})
                console.log("FUNCIONA 1 ")
            }else if(fechaIn>checkOut && fechaOut>checkOut){
                newRooms.push({room})
                console.log("FUNCIONA 2 ")
            }else{
                console.log("res");
            }
         })
        }
     }) */

     /* 
     /*   {
    $or: [
        { $and: [ {checkIn:{$lt:checkIn}, checkOut:{$lt:checkIn}} ] },
        { $and: [ {checkIn:{$gt:checkIn}, checkOut:{$gt:checkOut}} ] }
    ]
} */ 