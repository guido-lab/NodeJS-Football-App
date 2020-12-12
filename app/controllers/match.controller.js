const db = require("../models");
const Match = db.match;
const Op = db.Sequelize.Op;

// Create and Save a player to the team
exports.create = (req, res) => {
    // Validate request
    if (!req.body.HomeTeamId || !req.body.AwayTeamId) {
      res.status(400).send({
        message: "Match can not be empty!"
      });
      return;
    }

    // Create a player to the team
    const match_data = {
        HomeTeamId: req.body.HomeTeamId,
        AwayTeamId: req.body.AwayTeamId,
        MatchDate: req.body.MatchDate
    };

    // Save a player to the team in the database
    Match.create(match_data)
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

// Retrieve all a player of a team from the database.
exports.findAll = (req, res) => {
    const active = req.query.active;
    var condition = active ? { active: { [Op.eq]: `${active}` } } : null;
  console.log(condition)
    Match.findAll({ where: condition })
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

// Find a single Match with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Match.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Match with id=" + id
        });
      });
  };

// Update a Match by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Match.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Match was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Match with id=${id}. Maybe Match was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Match with id=" + id
        });
      });
  };

// Delete a Match with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Match.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Match was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Match with id=${id}. Maybe Match was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Match with id=" + id
        });
      });
  };

// Delete all Match from the database.
exports.deleteAll = (req, res) => {
    Match.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Match were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all team."
        });
      });
  };

// Find all published Match
exports.findAllActive = (req, res) => {
    Match.findAll({ where: { deleted: false } })
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