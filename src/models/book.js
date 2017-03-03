'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required.'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Author is required.'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Genre is required.'
        }
      }
    },
    first_published: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.Loan, { foreignKey: 'book_id' });
      }
    },
    timestamps: false
  });
  return Book;
};


/* CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT UNIQUE NOT NULL,
      author TEXT NOT NULL,
      genre TEXT,
      first_published INTEGER);
      
      node_modules/.bin/sequelize model:create --name Book --attributes id:integer,title:string,author:string,genre:string,first_published:integer
      */