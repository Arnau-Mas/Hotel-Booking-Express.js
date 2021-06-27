const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    checkIn:Date,
    checkOut:Date,
    idRoom: {type: mongoose.Schema.Types.ObjectId, ref:"rooms"} /* Aqui referenciem la col·lecció q té el iD a relacionar amb l'id de la reserva */
})

const Booking = mongoose.model("Bookings", bookingSchema);
module.exports = Booking;