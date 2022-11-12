const mongoose = require("mongoose");

const Ticket = mongoose.model(
    "Ticket",
    new mongoose.Schema({
        place: Number,
        name: String,
        adultOrChild: String,
        series: Number,
        number: Number,
        userId: String,
        flightId: String,
  })
);

module.exports = Ticket;
