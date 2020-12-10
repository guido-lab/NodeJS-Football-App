module.exports = (sequelize, Sequelize) => {
    const Teams = sequelize.define("teams", {
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
  
    return Teams;
  };