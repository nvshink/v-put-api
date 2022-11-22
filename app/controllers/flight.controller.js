const db = require("../models");
const Flight = db.flight;

exports.create = (req, res) => {
  if (!req.body.planeCode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const flight = new Flight({
    startDate: req.body.startDate,
    startCity: req.body.startCity,
    endDate: req.body.endDate,
    endCity: req.body.endCity,
    planeCode: req.body.planeCode,
    places: req.body.places,
    airline: req.body.airline,
    price: req.body.price,
  });

  flight
    .save(flight)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Flight."
      });
    });
};
exports.unicValuesColumn = (req, res) => {
  const request = req.query.request
  Flight.distinct(request).then(data => {
    res.send(data);
  })
}
// Retrieve all Flights from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};
  Flight.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flights."
      });
    });
};

// Find a single Flight with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Flight.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Not found Flight with id " + id });
      }
      else {
        res.send(data);
      }
    })
    .catch(err => {
      return res
        .status(500)
        .send({ message: "Error retrieving Flight with id=" + id });
    });
};

// Update a Flight by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  const placeId = req.body.place - 1;
  const placeIdStr = "places." + placeId.toString();
  Flight.findOneAndUpdate({ _id: id }, { $set: { [placeIdStr]: false } })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update Flight with id=${id}. Maybe Flight was not found!`
        });
      } else res.send({ message: "Flight was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Flight with id=" + id
      });
      return;
    });
};
// Delete a Flight with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Flight.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot delete Flight with id=${id}. Maybe Flight was not found!`
        });
      } else {
        res.send({
          message: "Flight was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Flight with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Flight.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

exports.findFlights = (req, res) => {
  const DateLeftBoard = req.query.date;
  const DateRightBoard = new Date(req.query.date);
  DateRightBoard.setDate(DateRightBoard.getDate() + 1);
  DateRightBoard.setMilliseconds(DateRightBoard.getMilliseconds() - 1);
  DateRightBoard.toISOString();
  const startCity = req.query.startCity;
  const endCity = req.query.endCity;
  Flight.find({ startCity, endCity, startDate: { $gte: DateLeftBoard, $lt: DateRightBoard } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message
      });
    });
};