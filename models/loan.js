'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_on: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
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