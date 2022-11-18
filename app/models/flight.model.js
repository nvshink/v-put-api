const mongoose = require("mongoose");

const Flight = mongoose.model(
  "Flight",
  new mongoose.Schema(
    {
      startDate: Date,
      startCity: String,
      endDate: Date,
      endCity: String,
      planeCode: String,
      places: Array,
      airline: String,
      price: Number
    },
    { timestamps: true }
  ));
  module.exports = Flight;