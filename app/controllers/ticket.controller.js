const db = require("../models");
const Ticket = db.ticket;

exports.create = (req, res) => {
    if (!req.body.place) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const ticket = new Ticket({
        place: req.body.place,
        name: req.body.name,
        adultOrChild: req.body.adultOrChild,
        series: req.body.series,
        number: req.body.number,
        userId: req.body.userId,
        flightId: req.body.flightId,
    });
    console.log(ticket);
    ticket
        .save(ticket)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Ticket."
            });
        });
};

exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};
    Ticket.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tickets."
        });
      });
  };
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Ticket.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Ticket with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Ticket with id=" + id });
      });
  };

  exports.findForUser = (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    Ticket.find({"userId": userId})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Ticket with id " + userId });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Ticket with id=" + userId });
      });
  };
  