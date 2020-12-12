const db = require("../models");
const playerTeam = db.playerTeam;
const Op = db.Sequelize.Op;

// Create and Save a player to the team
exports.create = (req, res) => {
    // Validate request
    if (!req.body.playerId) {
      res.status(400).send({
        message: "Name can not be empty!"
      });
      return;
    }

    // Create a player to the team
    const team = {
      PlayerId: req.body.playerId,
      TeamId: req.body.TeamId,
      active: req.body.active ? req.body.active : true
    };

    // Save a player to the team in the database
    playerTeam.create(team)
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

    playerTeam.findAll({ where: condition })
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

// Find a single playerTeam with an id
exports.findOne = (req, res) => {
    const TeamId = req.params.TeamId;
  
    playerTeam.findByPk(TeamId)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving playerTeam with TeamId=" + TeamId
        });
      });
  };

// Update a playerTeam by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    playerTeam.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "playerTeam was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update playerTeam with id=${id}. Maybe playerTeam was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating playerTeam with id=" + id
        });
      });
  };

// Delete a playerTeam with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    playerTeam.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "playerTeam was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete playerTeam with id=${id}. Maybe playerTeam was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete playerTeam with id=" + id
        });
      });
  };

// Find all playerTeam
exports.findAllActive = (req, res) => {
    playerTeam.findAll({ where: { deleted: false } })
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