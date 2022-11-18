const controller = require("../controllers/flight.controller.js");

module.exports = app => {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  router.post("/", controller.create);

  router.get("/search/cities", controller.unicValuesColumn);

  router.get("/", controller.findAll);

  router.get("/search", controller.findFlights);

  router.get("/:id", controller.findOne);

  router.put("/:id", controller.update);

  router.delete("/:id", controller.delete);

  router.delete("/", controller.deleteAll);


  app.use("/api/flights", router);
};
