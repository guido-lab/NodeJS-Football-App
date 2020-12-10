module.exports = (sequelize, Sequelize) => {
    const Players = sequelize.define("players", {
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
  
    return Players;
  };