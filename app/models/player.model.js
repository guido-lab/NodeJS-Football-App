module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
      name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      deleted: {
        type: Sequelize.BOOLEAN
      }
    });
  
    Player.associate = models => {
      Player.hasMany(models.playerTeam, {
        onDelete: "cascade"
      })
  }

  return Player;
  };