module.exports = app => {
  const flights = require("../controllers/flight.controller.js");

  var router = require("express").Router();

  router.post("/", flights.create);

  router.get("/search/cities", flights.unicValuesColumn);

  router.get("/", flights.findAll);

  router.get("/search", flights.findFlights);

  router.get("/:id", flights.findOne);

  router.put("/:id", flights.update);

  router.delete("/:id", flights.delete);

  router.delete("/", flights.deleteAll);


  app.use("/api/flights", router);
};
