'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
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