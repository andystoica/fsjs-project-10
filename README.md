====================================
Treehouse Full Stack JavaScript
Project 10 - Build a Library Manager
====================================

Brief
=====

You've been tasked with creating a library management system for a small library. The librarian has been using a simple sqlite database and has been entering data in manually. The librarian wants a more intuitive way to handle the library's books, patrons and loans.

You'll be given static HTML designs, a set of requirements and the existing SQLite database. You'll be required to implement a dynamic website in Express and a SQL ORM, Sequelize.

###
Main tasks and challenges were:
* Create a node.js / express application from scratch
* Model an existing SQlite database with Sequelize npm module
* Implement routes for books, patrons and lons with for Listing, Creating and Updating records
* Extra challenge to implement search functionality and pagination controls

## Usage
~~~~
npm install
npm start

http://localhost:3000
~~~~

Pagination settings can be adjusted in the /routes/utilities.js file
~~~~
const perPage = 3;
~~~~