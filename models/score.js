module.exports = function(sequelize, DataTypes) {
  const Score = sequelize.define("Score", {
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  Score.associate = function(models) {
    Score.belongsTo(models.User);
  };
  return Score;
};
