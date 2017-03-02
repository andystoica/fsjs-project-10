'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Book ID is required.'
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Patron ID is required.'
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: 'Loaned on Date is required.'
        },
        isDate: {
          msg: 'Loaned on Date must be a valid date.'
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: 'Return by Date is required.'
        },
        isDate: {
          msg: 'Return by Date must be a valid date.'
        }
      }
    },
    returned_on: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Book, { foreignKey: 'book_id' });
        this.belongsTo(models.Patron, { foreignKey: 'patron_id' });
      }
    },
    timestamps: false
  });
  return Loan;
};


/* CREATE TABLE loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER NOT NULL,
      patron_id INTEGER NOT NULL, 
      loaned_on DATE NOT NULL,
      return_by DATE NOT NULL,
      returned_on DATE,

      FOREIGN KEY(book_id) REFERENCES books(id),
      FOREIGN KEY(patron_id) REFERENCES patrons(id));

      node_modules/.bin/sequelize model:create --name Loan --attributes id:integer,book_id:integer,patron_id:integer,loaned_on:date,return_by:date,returned_on:date
      */