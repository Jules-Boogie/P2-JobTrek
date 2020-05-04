// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function (sequelize, DataTypes) {
  var Company = sequelize.define("Company", {

    // (CompanyTable
    // user_id
    // company 
    // Notes
    // rating )

    user_id: {
      type: DataTypes.INTEGER
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // The password cannot be null
    notes: {
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.INTEGER
    }
  });

  return Company;
};
