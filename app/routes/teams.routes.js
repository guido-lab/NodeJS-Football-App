module.exports = app => {
    const teams = require("../controllers/teams.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", teams.create);
  
    // Retrieve all Tutorials
    router.get("/", teams.findAll);
  
    // Retrieve all published Tutorials
    router.get("/active", teams.findAllActive);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", teams.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", teams.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", teams.delete);
  
    // Create a new Tutorial
    router.delete("/", teams.deleteAll);
  
    app.use('/api/teams', router);
  };