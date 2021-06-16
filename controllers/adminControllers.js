const express = require('express');
const HotelRoom = require('../models/hotelModels');
const router = express.Router();

router.get("/", async (req,res)=>{
    const allRooms = await HotelRoom.find();
    console.log("Petició feta a /admin");
    res.status(200).render("index",{
        rooms:allRooms,
        typeUser:"admin"
    });
})

router.get("/room/:idRoom", async(req,res)=>{
     //si rebem un idRoom significa que volem modificar l'apartament. En cas contrari, insertar un nou, pq ja hi ha el id hidden al form
     let idRoom = req.params.idRoom;
     console.log("El idRoom es:",idRoom);
     const locatedRoom = await HotelRoom.findById(idRoom);
     if(idRoom){
         console.log("actualitzem room ja existent");
         res.status(200).render("add-new", {
             typeUser:"admin",
             room: locatedRoom, //ho posem aixi pq no entri en conflicte amb quan fem un edit de room idroom en mode admin
         });
     }
})

router.get("/add-new",async(req,res)=>{
        res.status(200).render("add-new", {
            typeUser:"admin",
            room: {}, //ho posem aixi pq no entri en conflicte amb quan fem un edit de room idroom en mode admin
})});

router.post("/add-new", async (req,res)=>{
    const idRoom = req.body.idRoom;
    const title = req.body.title;
    const meters = req.body.meters;
    const mainphotourl = req.body.mainphotourl;
    const mainphotozone = req.body.mainphotozone;
    const photo1url = req.body.photo1url;
    const photo1zone = req.body.photo1zone;
    const photo2zone = req.body.photo2zone;
    const photo2url = req.body.photo2url;
    const photo3zone = req.body.photo3zone;
    const photo3url = req.body.photo3url;
    const price = req.body.price;
    if(idRoom){  //aqui fem el updateOne (1.recuperarfindbyid el docu, modificar los campos, hacer .save())
        const locatedRoom = await HotelRoom.findById(idRoom);
        locatedRoom.title = title;
        locatedRoom.meters = meters;
        locatedRoom.mainphotourl = mainphotourl;
        locatedRoom.mainphotozone = mainphotozone;
        locatedRoom.photo1url = photo1url;
        locatedRoom.photo1zone = photo1zone;
        locatedRoom.photo2zone = photo2zone;
        locatedRoom.photo2url = photo2url;
        locatedRoom.photo3zone = photo3zone;
        locatedRoom.photo3url = photo3url;
        locatedRoom.price = price;
        await locatedRoom.save();
        res.redirect("/admin");
    }else{
    console.log("El req.body tiene", req.body);
/*     const description = req.body.description;
    const airconditioning = req.body.airconditioning;
    const heating = req.body.heating;
    const reducedmobility = req.body.reducedmobility;
    const tv = req.body.tv;
    const kitchen = req.body.kitchen;
    const wifi = req.body.wifi;
    const roomsnum = req.body.roomsnum;
    const bedsnum = req.body.bedsnum;
    const toiletsnum = req.body.toiletsnum;
    const maxpeople = req.body.maxpeople;
    const photo3zone = req.body.photo3zone;
    const photo3url = req.body.photo3url;
    const datein = req.body.datein;
    const dateout = req.body.dateout;
    const rules = req.body.rules;
    const location = req.body.location; */

     // una altra manera de cridar les dades del req.body operador de desestructuracio fariem {title, description, zipcode} = req.query, i ja obtenim tot. Destructuring assignment
    const room = new HotelRoom({
        title:title,
        price:price,
        meters:meters,
        mainphoto:mainphotourl,
        mainphotozone:mainphotozone,
        photo1url:photo1url,
        photo1zone:photo1zone,
        photo2url:photo2url,
        photo2zone:photo2zone,
        photo3url:photo3url,
        photo3zone:photo3zone,

    })
    await room.save();

    res.status(200).render("add-new", {
        submit:true,
        typeUser:"admin",
        room:{},
    })
}
})


module.exports = router;