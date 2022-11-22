const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
  return;
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
  return;
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
  return;
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  const data = {
    place: req.body.place,
    name: req.body.name,
    adultOrChild: req.body.adultOrChild,
    series: req.body.series,
    number: req.body.number,
    flightId: req.body.flightId,
  }
  User.findOneAndUpdate({ _id: id }, { $push: { flights: data } })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found!`
        });
        return;
      } else {
        res.send({ message: "User was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
      return;
    });
};