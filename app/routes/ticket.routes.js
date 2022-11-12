const controller = require("../controllers/ticket.controller.js");

module.exports = app => {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();

    router.post("/tickets/", controller.create);

    router.get("/tickets/", controller.findAll);

    router.get("/ticket/:id", controller.findOne);

    router.get("/tickets/:userId", controller.findForUser);


    app.use("/api", router);
};