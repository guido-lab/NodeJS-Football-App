module.exports = app => {
    const player = require("../controllers/player.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", player.create);
  
    // Retrieve all Tutorials
    router.get("/", player.findAll);
  
    // Retrieve all published Tutorials
    router.get("/active", player.findAllActive);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", player.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", player.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", player.delete);
  
    // Create a new Tutorial
    router.delete("/", player.deleteAll);
  
    app.use('/api/player', router);
  };