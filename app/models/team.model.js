module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("team", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      date_created: {
        type: Sequelize.DATE
      },
      coach: {
        type: Sequelize.STRING
      },
      president: {
        type: Sequelize.STRING
      },
      deleted: {
        type: Sequelize.BOOLEAN
      }
    });
  
    Team.associate = models => {
      Team.hasMany(models.teamPlayer, {
        onDelete: "cascade"
      })
  }

    return Team;
  };