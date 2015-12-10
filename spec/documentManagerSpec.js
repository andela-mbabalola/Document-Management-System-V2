/****************************************************************
 *Name: String Class Test.
 *Description: To test the String Class program's functionality
 *Author: Babalola Maryam
 *****************************************************************/
var fixtures = require("./fixtures"),
  dms = require('./../documentManager'),
  _models = require('./../server/models');

describe("Document Management System", function() {
  describe("User", function() {
    var testUsers = {};
    beforeEach(function(before_done) {
      fixtures.createTestRoles(function(err, roles) {
        if (err) {
          console.log(err);
          before_done(err);
        } else {
          console.log('Roles Created!');
          fixtures.createTestUsers(function(err, users) {
            if (err) {
              console.log(err);
              before_done(err);
            } else {
              testUsers = users;
              console.log('Users Created!');
              before_done();
            }
          });
        }
      });
    });

    afterEach(function(done) {
      _models.User.remove({}, function() {
        _models.Role.remove({}, function() {
          done();
        });
      });
    });

    it("validates that a new user created is unique ", function(done) {
      expect(testUsers.user1).toEqual(jasmine.objectContaining({
        userName: 'Bolu',
        firstName: 'lawrence'
      }));
      expect(testUsers.user2).toEqual(jasmine.objectContaining({
        userName: 'erow',
        firstName: 'rowland'
      }));
      expect(testUsers.user3).toEqual(jasmine.objectContaining({
        userName: 'Emmy',
        firstName: 'Emmanuel'
      }));
      done();
    });

    it("validates that a new user created has a role defined ", function(done) {
      expect(testUsers.user1.roleId.length).not.toEqual(0);
      expect(testUsers.user2.roleId.length).not.toEqual(0);
      expect(testUsers.user3.roleId.length).not.toEqual(0);
      done();
    });

    it("validates that a new user created both first and last names ", function(done) {
      expect(testUsers.user1).toEqual(jasmine.objectContaining({
        firstName: 'lawrence',
        lastName: 'Bolutife'
      }));
      expect(testUsers.user2).toEqual(jasmine.objectContaining({
        firstName: 'rowland',
        lastName: 'Ekemezie'
      }));
      expect(testUsers.user3).toEqual(jasmine.objectContaining({
        firstName: 'Emmanuel',
        lastName: 'Akinyele'
      }));
      done();
    });

    it("validates that all users are returned when getAllUsers is called", function(done) {
      dms.getAllUsers(function(err, users) {
        if (err) {
          console.log(err);
          done();
        } else {
          expect(users.length).toEqual(3);
          done();
        }
      });
    });
  });

  describe("Role", function() {
    var testRoles = {};
    beforeEach(function(before_done) {
      fixtures.createTestRoles(function(err, roles) {
        if (err) {
          console.log(err);
          before_done(err);
        } else {
          console.log('Roles Created!');
          testRoles = roles;
          before_done();
        }
      });
    });

    afterEach(function(done) {
      _models.Role.remove({}, function() {
        done();
      });
    });

    it("validates that a new role created has a unique title ", function() {
      expect(testRoles.role1.title).toEqual('admin');
      expect(testRoles.role2.title).toEqual('manager');
      expect(testRoles.role3.title).toEqual('superad');
    });

    it("validates that all roles are returned when getAllRoles is called", function(done) {
      dms.getAllRoles(function(err, roles) {
        if (err) {
          console.log(err);
          done();
        } else {
          expect(roles.length).toEqual(3);
          done();
        }
      });
    });
  });

  describe("Documents", function() {
    var testDocs = {};
    beforeEach(function(before_done) {
      fixtures.createTestRoles(function(err, roles) {
        if (err) {
          console.log(err);
          before_done(err);
        } else {
          console.log('Roles Created!');
          fixtures.createTestUsers(function(err, users) {
            if (err) {
              console.log(err);
              before_done(err);
            } else {
              console.log('Users created');
              fixtures.createTestDocuments(function(err, documents) {
                if (err) {
                  console.log(err);
                  before_done(err);
                } else {
                  testDocs = documents;
                  console.log('Document created');
                  before_done();
                }
              });
            }
          });
        }
      });
    });

    afterEach(function(done) {
      _models.Document.remove({}, function() {
        _models.User.remove({}, function() {
          _models.Role.remove({}, function() {
            done();
          });
        });
      });
    });

    it("validates that a new user document created has a published date defined", function(done) {
      expect(testDocs.document1.createdAt).toBeDefined();
      expect(testDocs.document2.createdAt).toBeTruthy();
      expect(testDocs.document3.createdAt).not.toBeNull();
      done();
    });

    it("validates that all documents are returned, limited by a specified number, when getAllDocuments is called", function(done) {
      dms.getAllDocuments(2, function(err, documents) {
        if (err) {
          console.log(err);
          done();
        } else {
          expect(documents.length).toEqual(2);
          done();
        }
      });
      dms.getAllDocuments(3, function(err, documents) {
        if (err) {
          console.log(err);
          done();
        } else {
          expect(documents.length).toEqual(3);
          expect(documents.length).not.toBeNull();
          done();
        }
      });
    });

    it("validates that all documents are returned in order of their published dates, starting from the most recent when getAllDocuments is called.", function(done) {
      dms.getAllDocuments(3, function(err, documents) {
        if (err) {
          console.log(err);
          done();
        } else {
          expect(documents[0]).toEqual(jasmine.objectContaining({
            title: 'Curriculum',
            content: 'All the necessary things to know'
          }));
          expect(documents[1]).not.toBeNull();
          done();
        }
      });
    });
  });


  describe("Search", function() {
    var testDocs = {};
    beforeEach(function(before_done) {
      fixtures.createTestRoles(function(err, roles) {
        if (err) {
          console.log(err);
          before_done(err);
        } else {
          console.log('Roles Created!');
          fixtures.createTestUsers(function(err, users) {
            if (err) {
              console.log(err);
              before_done(err);
            } else {
              console.log('Users created');
              fixtures.createTestDocuments(function(err, documents) {
                if (err) {
                  console.log(err);
                  before_done(err);
                } else {
                  testDocs = documents;
                  console.log('Document created');
                  before_done();
                }
              });
            }
          });
        }
      });
    });

    afterEach(function(done) {
      _models.Document.remove({}, function() {
        _models.User.remove({}, function() {
          _models.Role.remove({}, function() {
            done();
          });
        });
      });
    });

    it("validates that all documents, limited by a specified number, that were published on a certain date, are returned when getAllDocumentsByDate is called", function(done) {
      dms.getAllDocumentsByDate(testDocs.document1.createdAt, 1, function(err, documents) {
        if (err) {
          console.log(err);
          done();
        } else {
          expect(documents.length).toEqual(1);
          expect(documents.length).not.toBeNull();
          done();
        }
      });
    });

    it ( "validates that all documents, limited by a specified number and ordered by published date, that can be accessed by a specified role, are returned when getAllDocumentsByRole is called", function (done) {
      dms.getAllDocumentsByRole('admin', 1, function (err, documents) {
        if (err) {
          console.log(err);
          done();
        } else {
          expect(documents.length).toEqual(1);
          done();
        }
      });
      dms.getAllDocumentsByRole('superad', 1, function (err, documents) {
        if (err) {
          console.log(err);
          done();
        } else {
          expect(documents.length).toEqual(1);
          expect(documents.length).not.toBeNull();
          done();
        }
      });
    });
  });
});
