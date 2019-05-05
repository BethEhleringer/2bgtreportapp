
// Creating our Report model
module.exports = function(sequelize, DataTypes) {
  var Report = sequelize.define("Report", {

    pers_spir: {
      type: DataTypes.INTEGER
    },
    pers_emot: {
      type: DataTypes.INTEGER
    },
    pers_health: {
      type: DataTypes.INTEGER
    },
    pers_pr_req: {
        type: DataTypes.STRING
    }
    
  });

  
  Report.associate = function(models) {
    // We're saying that a Report should belong to a User
    // A Report can't be created without a User due to the foreign key constraint
    Report.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  
  return Report;
};
