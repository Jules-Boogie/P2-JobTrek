// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function (sequelize, DataTypes) {
  var Contact = sequelize.define("Contact", {

    // (CompanyTable
    // id
    // company 
    // Notes
    // rating )

    // The email cannot be null, and must be a proper email before creation
    user_id: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING
    },
    // The password cannot be null
    company_id: {
      type: DataTypes.INTEGER
    },
    contact1: {
      type: DataTypes.STRING
    },
    contact2: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    notes: {
      type: DataTypes.TEXT
    }

  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  return Contact;
};
