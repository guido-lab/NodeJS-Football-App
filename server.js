const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to FootballScore application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;

require("./app/routes/player.routes")(app);
require("./app/routes/team.routes")(app);
require("./app/routes/playerTeam.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// sync({ force: true })
const db = require("./app/models");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });