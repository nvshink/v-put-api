const db = require("../models");
const path = require("path");
const ticketPdfTemplate = require("../documents");
const htmlPdf = require("html-pdf");
const { Blob } = require("buffer");
const Ticket = db.ticket;
const Flight = db.flight;

exports.create = (req, res) => {
  if (!req.body.place) {
    return res.status(400).send({ message: "Content can not be empty!" });
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
      return;
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
      return;
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Ticket.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Not found Ticket with id " + id });
        return;
      }
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Ticket with id=" + id });
      return;
    });
};

exports.findForUser = (req, res) => {
  const userId = req.params.userId;
  Ticket.find({ "userId": userId })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Not found Ticket with id " + userId });
      }
      else {
        res.send(data);
      }
    })
    .catch(err => {
      return res
        .status(500)
        .send({ message: "Error retrieving Ticket with id=" + userId });
    });
};

exports.print = (req, res) => {
  const id = req.params.ticketId;
  var printData = {
    id: id,
    name: null,
    series: null,
    number: null,
    flight: null
  }
  Ticket.findById(id)
    .then(data => {
      printData.name = data.name;
      printData.series = data.series;
      printData.number = data.number;
      Flight.findById(data.flightId)
        .then(flightData => {
          if (!flightData) {
            return res.status(404).send({ message: "Not found Flight with id" });
          }
          else {
            printData.flight = flightData;
            htmlPdf.create(ticketPdfTemplate.ticketTemplate(printData), {}).toFile(`ticket.pdf`, (err) => {
              if (err) {
                res.send(Promise.reject());
              }
              res.send(Promise.resolve());
            });
          }
        })
        .catch(err => {
          return res
            .status(500)
            .send({ message: "Error retrieving Flight with id" });
        });
    })
    .catch(err => {
      return res
        .status(500)
        .send({ message: "Error retrieving Ticket with id=" + id });
    });
};
exports.fetch = (req, res) => {
  res.sendFile(`${path.normalize(__dirname + "/../..")}/ticket.pdf`);
};