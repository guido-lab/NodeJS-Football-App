module.exports = (sequelize, Sequelize) => {
    const Match = sequelize.define("match", {
    HomeTeamId: {
        type: Sequelize.INTEGER,
        references: {
           model: 'teams', // 'teams' refers to table name
           key: 'id', // 'id' refers to column name in teams table
        }
     },
    HomeResult: {
        type: Sequelize.INTEGER
    },
    AwayTeamId: {
        type: Sequelize.INTEGER,
        references: {
           model: 'teams', // 'teams' refers to table name
           key: 'id', // 'id' refers to column name in teams table
        }
     },
    AwayResult: {
        type: Sequelize.INTEGER
    },
    MatchDate: {
        type: Sequelize.DATE
      }
    });
  
    Match.associate = models => {
      Match.hasMany(models.Team, {
        onDelete: "cascade"
      })
  }

  return Match;
  };