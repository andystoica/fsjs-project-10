'use strict';
module.exports = function(sequelize, DataTypes) {
  var Patron = sequelize.define('Patron', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'First name is required.'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name is required.'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Address is required.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email is required.'
        }
      }
    },
    library_id: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Library ID is required.'
        }
      }
    },
    zip_code: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'ZIP Code is required.'
        }
      }
    }
  }, {
    getterMethods: {
      name: function () { return this.first_name + ' ' + this.last_name }
    },
    classMethods: {
      associate: function(models) {
        this.hasMany(models.Loan, { foreignKey: 'patron_id' });
      }
    },
    timestamps: false
  });
  return Patron;
};


/* CREATE TABLE patrons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      address TEXT NOT NULL,
      email TEXT NOT NULL,
      library_id TEXT NOT NULL,
      zip_code INTEGER NOT NULL);

      node_modules/.bin/sequelize model:create --name Loan --attributes id:integer,first_name:string,last_name:string,address:string,email:string,library_id:string,zip_code:integer
      */