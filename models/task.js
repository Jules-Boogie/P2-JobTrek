// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    //     Job_ID
    // Task to be done
    // Task status
    // Task must be done by(deadline)
    user_id: {
      type: DataTypes.INTEGER
    },
    job_id: {
      type: DataTypes.INTEGER
    },
    task: {
      type: DataTypes.STRING
    },
    task_status: {
      type: DataTypes.STRING
    },
    deadline: {
      type: DataTypes.DATE
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  return Task;
};
