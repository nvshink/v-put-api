module.exports = app => {
  const flights = require("../controllers/flight.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", flights.create);

  // Retrieve all Tutorials
  router.get("/", flights.findAll);

  // Retrieve all published Tutorials
  router.get("/published", flights.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", flights.findOne);

  // Update a Tutorial with id
  router.put("/:id", flights.update);

  // Delete a Tutorial with id
  router.delete("/:id", flights.delete);

  // Create a new Tutorial
  router.delete("/", flights.deleteAll);

  app.use("/api/flights", router);
};
