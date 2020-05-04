// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
module.exports = function (sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    user_id: {
      type: DataTypes.INTEGER
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        len: [3, 500]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 500]
    }
    },
    requirement: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 500]
    }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 500]
    }
    },
    company: {
      type: DataTypes.STRING,
      
    
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 500]
      }
    },
    url: {
      type: DataTypes.STRING,
      isUrl: true,
      notEmpty: true,
      allowNull: false,
      validate: {
        len: [3, 500]
      }
    },
    rating: {
      type: DataTypes.INTEGER
    },
    applied_date: {
      type: DataTypes.DATE
    },
    rejected_date: {
      type: DataTypes.DATE
    },
    responded_date: {
      type: DataTypes.DATE
    },
    interview1_date: {
      type: DataTypes.DATE
    },
    interview2_date: {
      type: DataTypes.DATE
    },
    offerMade_date: {
      type: DataTypes.DATE
    },
    statusChange_date: {
      type: DataTypes.DATE
    }
  });

  // Job.associate = function (models) {
  //   Job.belongsTo(models.User, { onDelete: 'CASCADE' });
  // };
   return Job;
};


