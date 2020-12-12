module.exports = app => {
    const match = require("../controllers/match.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", match.create);
  
    // Retrieve all Tutorials
    router.get("/", match.findAll);
  
    // Retrieve all published Tutorials
    router.get("/active", match.findAllActive);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", match.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", match.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", match.delete);
  
    // Create a new Tutorial
    router.delete("/", match.deleteAll);
  
    app.use('/api/match', router);
  };