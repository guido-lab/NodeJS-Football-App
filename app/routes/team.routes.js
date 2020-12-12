module.exports = app => {
    const team = require("../controllers/team.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", team.create);
  
    // Retrieve all Tutorials
    router.get("/", team.findAll);
  
    // Retrieve all published Tutorials
    router.get("/active", team.findAllActive);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", team.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", team.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", team.delete);
  
    // Create a new Tutorial
    router.delete("/", team.deleteAll);
  
    app.use('/api/team', router);
  };