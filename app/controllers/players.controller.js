const db = require("../models");
const Players = db.players;
const Op = db.Sequelize.Op;

// Create and Save a new Players
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.last_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Players
    const players = {
      name: req.body.name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      description: req.body.description,
      deleted: req.body.deleted ? req.body.deleted : false
    };
  
    // Save Players in the database
    Players.create(players)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Player."
        });
      });
  };

// Retrieve all Players from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Players.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving players."
        });
      });
  };

// Find a single Players with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Players.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Players with id=" + id
        });
      });
  };

// Update a Players by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Players.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Players was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Players with id=${id}. Maybe Players was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Players with id=" + id
        });
      });
  };

// Delete a Players with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Players.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Players was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Players with id=${id}. Maybe Players was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Players with id=" + id
        });
      });
  };

// Delete all Players from the database.
exports.deleteAll = (req, res) => {
    Players.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Players were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all players."
        });
      });
  };

// Find all published Players
exports.findAllActive = (req, res) => {
    Players.findAll({ where: { deleted: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving players."
        });
      });
  };