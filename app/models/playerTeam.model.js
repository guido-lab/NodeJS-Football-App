module.exports = (sequelize, Sequelize) => {
    const playerTeam = sequelize.define("player_team", {
      PlayerId: {
        type: Sequelize.INTEGER,
        references: {
           model: 'players', // 'player' refers to table name
           key: 'id', // 'id' refers to column name in player table
        }
     },
     TeamId: {
      type: Sequelize.INTEGER,
      references: {
         model: 'teams', // 'teams' refers to table name
         key: 'id', // 'id' refers to column name in teams table
      }
   },
   active: {
    type: Sequelize.BOOLEAN
  }
    });

    playerTeam.associate = models => {
        playerTeam.belongsTo(models.player, {
          foreignKey: {
            allowNull: false
          }
        })
    }

    playerTeam.associate = models => {
      playerTeam.belongsTo(models.Team, {
        foreignKey: {
          allowNull: false
        }
      })
  }
    return playerTeam;
  };