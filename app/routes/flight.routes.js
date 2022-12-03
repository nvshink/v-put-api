const { authJwt } = require("../middlewares");
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

  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  router.get("/search/cities", controller.unicValuesColumn);

  router.get("/", controller.findAll);

  router.get("/search", controller.findFlights);

  router.get("/some/s", controller.findSome);

  router.get("/:id", controller.findOne);

  router.put("/update", controller.update);

  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteAll);


  app.use("/api/flights", router);
};
