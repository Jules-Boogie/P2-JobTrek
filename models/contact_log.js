// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function (sequelize, DataTypes) {
  var Contact_Log = sequelize.define("Contact_Log", {
    // contact_ID
    // job_id
    // whatdidwesay
    // when_timestamp
    user_id: {
      type: DataTypes.INTEGER
    },
    contact_id: {
      type: DataTypes.INTEGER
    },
    job_id: {
      type: DataTypes.INTEGER
    },
    note: {
      type: DataTypes.TEXT
    },
    datestamp: {
      type: DataTypes.DATE
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  return Contact_Log;
};
