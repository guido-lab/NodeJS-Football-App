module.exports = app => {
    const player = require("../controllers/player.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
/**
 * @swagger
 * /api/player:
 *  post:
 *    parameters:
 *      - in: body
 *        name: player
 *        description: Use to insert new player
 *        schema:
 *          type: object
 *          required:
 *            - name
 *          properties:
 *            name:
 *              type: string
 *            last_name:
 *              type: string
 *            dob:
 *              type: date
 *            description:
 *              type: string
 *    responses:
 *      201:
 *        description: Created
 */
    router.post("/", player.create);
  
    // Retrieve all Tutorials
/**
 * @swagger
 * /api/player:
 *  get:
 *    description: Use to get all player
 *    responses:
 *      '200':
 *        description: A successful response
 */
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