const express = require('express');
const HotelRoom = require('../models/hotelModels');
const router = express.Router();

router.get("/", async (req,res)=>{
    const allRooms = await HotelRoom.find();
    const roomsRemoved = await HotelRoom.find({downDate:undefined});
    console.log("allRooms es:", allRooms);
    console.log("Petició feta a /admin");
    res.status(200).render("index",{
        rooms:allRooms,
        typeUser:"admin",
        roomsRemoved:roomsRemoved
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
             room: locatedRoom,
             idValue: idRoom, //ho posem aixi pq no entri en conflicte amb quan fem un edit de room idroom en mode admin
         });
     }
})

//li diem q la room identificada amb l':idRoom ja no esta disponible
router.get("/room/:idRoom/delete", async (req,res)=>{
    ("S'ha fet un remove");
    //busquem l'habitació a la col·lecció rooms
    const idRoom = req.params.idRoom;
    const room = await HotelRoom.findById(idRoom);
    room.downDate = Date();
    await room.save();

    res.redirect("/admin");
})

router.get("/room/:idRoom/recover", async (req,res)=>{
    ("S'ha fet un recover");
    //busquem l'habitació a la col·lecció rooms
    const idRoom = req.params.idRoom;
    const room = await HotelRoom.findById(idRoom);
    room.downDate = null;
    await room.save();

    res.redirect("/admin");
})

router.get("/add-new",async(req,res)=>{
        res.status(200).render("add-new", {
            typeUser:"admin",
            room: {},
            idValue:"", //ho posem aixi pq no entri en conflicte amb quan fem un edit de room idroom en mode admin
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
    const airconditioning = req.body.airconditioning;
    const heating = req.body.heating;
    const reducedmobility = req.body.reducedmobility;
    const tv = req.body.tv;
    const kitchen = req.body.kitchen;
    const wifi = req.body.wifi;
    console.log("ELS SERVEIS SON****************:", wifi, kitchen, tv, airconditioning, heating, reducedmobility); 
    if(idRoom){  //MODIFICAR HOTEL. aqui fem el recuperarfindbyid el docu, modificar los campos, hacer .save())
        const locatedRoom = await HotelRoom.findById(idRoom);
        locatedRoom.title = title; //AIXO ESTA ACTUALITZANT LES DADES A TRAVÉS DE MONGOOSE
        locatedRoom.meters = meters;
        locatedRoom.photos[0].url = mainphotourl;
        locatedRoom.photos[0].zone = mainphotozone;
        locatedRoom.photos[1].url = photo1url;
        locatedRoom.photos[1].zone = photo1zone;
        locatedRoom.photos[2].zone = photo2zone;
        locatedRoom.photos[2].url = photo2url;
        locatedRoom.photos[3].zone = photo3zone;
        locatedRoom.photos[3].url = photo3url;
        locatedRoom.price = price;
        locatedRoom.services= [airconditioning,heating,reducedmobility,tv,kitchen,wifi];
        await locatedRoom.save();
        res.redirect("/admin");
    }else{
    //AQUEST ELSE ES EL D'AFEGIR NOVA HABITACIÓ
    console.log("El req.body tiene", req.body);
/*     const description = req.body.description;
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
        photos:[{url:mainphotourl,zone:mainphotozone},{ url:photo1url, zone:photo1zone},{url:photo2url, zone:photo2zone},{url:photo3url, zone:photo3zone}],
        services:[airconditioning,heating,reducedmobility,tv,kitchen,wifi],
    },
       
    )
    await room.save();

    res.status(200).render("add-new", {
        submit:true,
        typeUser:"admin",
        room:{},
        idValue:"",
    })
}
})


module.exports = router;