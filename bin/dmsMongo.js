#!/usr/local/bin/node

var program = require('commander'),
    prettyjson = require('prettyjson'),
  _documentManager = require ('./../documentManager.js');


program
  .version('1.0.0');
  //.description('Document management system using MongoDB');

/**
 * createUser from CLI module
 */
program
  .command ('createUser <firstName> <lastName> <userName> <password> <role>')
  .description('Creating a new user');
  .action (function ( firstName, lastName, userName, email, password, role ) {
    _documentManager.createUser (firstName, lastName, userName, email, password, role, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(user));
      }
    });
  });

/**
 * createRole from CLI module
 */
program
  .command ('createRole <title>')
  .description('Creating a new role');
  .action (function ( title) {
    _documentManager.createRole (title, function (err, role) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(role));
      }
    });
  });

/**
 * createDocument from CLI module
 */
program
  .command ('createDocument <title> <content> <userName> <roles>')
  .description('Creating a new document');
  .action (function ( title, content, userName, roles) {
    _documentManager.createDocument (title, content, userName, roles, function (err, document) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify (document));
      }
    });
  });


/**
 * getAllUsers from CLI module
 */
program
  .command ('getAllUsers')
  .description('Getting all existing users');
  .action (function () {
    _documentManager.getAllUsers (function (err, users) {
      if (err)
        throw err;
      console.log(JSON.stringify(users));
    });
  });

  /**
   * getAllRoles from CLI module
   */
program
  .command ('getAllRoles')
  .description('Getting all existing roles');
  .action ( function () {
    _documentManager.getAllRoles (function(err, roles){
      if (err)
        throw err;
      console.log(JSON.stringify(roles));
    });
  });

  /**
   * getAllDocuments from CLI module
   */
program
  .command ('getAllDocuments <limit>')
  .description('Getting all existing documents');
  .action ( function (limit) {
    _documentManager.getAllDocuments (limit, function (err, documents) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(documents));
      }
    });
});

/**
 * getAllDocumentsByRole from CLI module
 */
program
  .command ('getAllDocumentsByRole <role> <limit>')
  .description('Getting all existing documents based on the role');
  .action ( function (role, limit) {
    _documentManager.getAllDocumentsByRole (role, limit, function (err, documents) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(documents));
      }
    });
});

/**
 * getAllDocumentsByDate from CLI module
 */
program
  .command ('getAllDocumentsByDate <date> <limit>')
  .description('Getting all existing documents based on the date created')
  .action ( function (date, limit) {
    _documentManager.getAllDocumentsByDate (date, limit, function (err, documents) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(documents));
      });
});

program.parse(process.argv);
