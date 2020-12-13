const db = require("../models");
const player = db.player;
const Op = db.Sequelize.Op;

// Create and Save a new player
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.last_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a player
    const player_data = {
      name: req.body.name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      description: req.body.description,
      deleted: req.body.deleted ? req.body.deleted : false
    };
  
    // Save player in the database
    player.create(player_data)
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

// Retrieve all player from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    player.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving player."
        });
      });
  };

// Find a single player with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    player.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving player with id=" + id
        });
      });
  };

// Update a player by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    player.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "player was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update player with id=${id}. Maybe player was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating player with id=" + id
        });
      });
  };

// Delete a player with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    player.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "player was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete player with id=${id}. Maybe player was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete player with id=" + id
        });
      });
  };

// Delete all player from the database.
exports.deleteAll = (req, res) => {
    player.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} player were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all player."
        });
      });
  };

// Find all published player
exports.findAllActive = (req, res) => {
    player.findAll({ where: { deleted: false } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving player."
        });
      });
  };