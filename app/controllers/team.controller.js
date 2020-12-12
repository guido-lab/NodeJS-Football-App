const db = require("../models");
const Team = db.team;
const Op = db.Sequelize.Op;

// Create and Save a new Team
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Name can not be empty!"
      });
      return;
    }

    // Create a Team
    const team = {
      name: req.body.name,
      description: req.body.description,
      date_created: req.body.date_created,
      coach: req.body.coach,
      president: req.body.president,
      deleted: req.body.deleted ? req.body.deleted : false
    };
  
    // Save Team in the database
    Team.create(team)
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

// Retrieve all Team from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Team.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving team."
        });
      });
  };

// Find a single Team with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Team.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Team with id=" + id
        });
      });
  };

// Update a Team by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Team.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Team was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Team with id=${id}. Maybe Team was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Team with id=" + id
        });
      });
  };

// Delete a Team with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Team.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Team was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Team with id=${id}. Maybe Team was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Team with id=" + id
        });
      });
  };

// Delete all Team from the database.
exports.deleteAll = (req, res) => {
    Team.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Team were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all team."
        });
      });
  };

// Find all published Team
exports.findAllActive = (req, res) => {
    Team.findAll({ where: { deleted: false } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving team."
        });
      });
  };