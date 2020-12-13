const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8082"
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
const PORT = process.env.PORT || 8082;

// Swagger implmentation
require("../swagger")(app);

// register routes main js File
require("./routes/player.routes")(app);
require("./routes/team.routes")(app);
require("./routes/playerTeam.routes")(app);
require("./routes/match.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// sync({ force: true })
const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });