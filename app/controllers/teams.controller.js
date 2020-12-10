const db = require("../models");
const Teams = db.teams;
const Op = db.Sequelize.Op;

// Create and Save a new Teams
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Name can not be empty!"
      });
      return;
    }

    // Create a Teams
    const team = {
      name: req.body.name,
      description: req.body.description,
      date_created: req.body.date_created,
      coach: req.body.coach,
      president: req.body.president,
      deleted: req.body.deleted ? req.body.deleted : false
    };
  
    // Save Teams in the database
    Teams.create(team)
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

// Retrieve all Teams from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Teams.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving teams."
        });
      });
  };

// Find a single Teams with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Teams.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Teams with id=" + id
        });
      });
  };

// Update a Teams by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Teams.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Teams was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Teams with id=${id}. Maybe Teams was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Teams with id=" + id
        });
      });
  };

// Delete a Teams with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Teams.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Teams was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Teams with id=${id}. Maybe Teams was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Teams with id=" + id
        });
      });
  };

// Delete all Teams from the database.
exports.deleteAll = (req, res) => {
    Teams.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Teams were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all teams."
        });
      });
  };

// Find all published Teams
exports.findAllActive = (req, res) => {
    Teams.findAll({ where: { deleted: false } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving teams."
        });
      });
  };