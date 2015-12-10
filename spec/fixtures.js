var dms = require("./../documentManager"),
  models = require("./../server/models"),
  _async = require("async");

module.exports = {
  createTestUsers: function(done) {
    _async.parallel({
      user1: function(callback) {
        dms.createUser('lawrence', 'Bolutife', 'Bolu', 'law', 'admin', function(err, user) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, user);
          }
        });
      },

      user2: function(callback) {
        dms.createUser('rowland', 'Ekemezie', 'erow', 'row', 'manager', function(err, user) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, user);
          }
        });
      },

      user3: function(callback) {
        dms.createUser('Emmanuel', 'Akinyele', 'Emmy', 'akin', 'superad', function(err, user) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, user);
          }
        });
      }
    }, function(err, users) {
      if (err) {
        done(err, null);
      } else {
        done(null, users);
      }
    });
  },

  createTestRoles: function(done) {
    _async.parallel({
      role1: function(callback) {
        dms.createRole('admin', function(err, role) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, role);
          }
        });
      },

      role2: function(callback) {
        dms.createRole('manager', function(err, role) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, role);
          }
        });
      },

      role3: function(callback) {
        dms.createRole('superad', function(err, role) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, role);
          }
        });
      }
    }, function(err, roles) {
      if (err) {
        done(err, null);
      } else {
        done(null, roles);
      }
    });
  },
  createTestDocuments: function(done) {
    _async.series({
      document1: function(cb) {
        dms.createDocument('Curriculum', 'All the necessary things to know', 'Bolu', 'admin', function(err, doc) {
          if (err) {
            cb(err, null);
          } else {
            cb(null, doc);
          }
        });
      },

      document2: function(cb) {
        dms.createDocument('Harry Porter', 'Book 1-6', 'erow', 'manager', function(err, doc) {
          if (err) {
            cb(err, null);
          } else {
            cb(null, doc);
          }
        });
      },

      document3: function(cb) {
        dms.createDocument('Star wars', 'Complete star wars narrated', 'Emmy', 'superad', function(err, doc) {
          if (err) {
            cb(err, null);
          } else {
            cb(null, doc);
          }
        });
      }
    }, function(err, documents) {
      if (err) {
        done(err, null);
      } else {
        done(null, documents);
      }
    });
  }
};
