var _models = require("./server/models"),
  mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dms", function(err) {
  if (err)
    console.log("Error connecting to the database");
  console.log("Connection successfully established");
});

/**
 * [createUser: create/insert user into the database]
 * @param  {[string]} firstName [User's first name]
 * @param  {[string]} lastName  [User's last name]
 * @param  {[string]} userName  [User's userName]
 * @param  {[string]} password  [User's password]
 * @param  {[string]} role      [User's role]
 * @return {[string]}   Successfully created user        [User successfully created/inserted into the database]
 */
exports.createUser = function(firstName, lastName, userName, password, role, cb) {
  _models.User.findOne({
    firstName: firstName,
    lastName: lastName
  }).then(function(user) {
    if (!user) {
      _models.Role.findOne({
        title: role
      }).then(function(role) {
        if (!role)
          cb("Role does not exist. Create first", null);
        else {
          var newUser = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            roleId: role._id
          };
          _models.User.create(newUser, function(err, user) {
            if (err) {
              cb(err, null);
            } else {
              cb(null, user);
            }
          });
        }
      });
    } else {
      cb("User already exists", null);
    }
  });
};

//createUser ("bisi", "ola", "law", "jhthjvkf", "Assistant");

/**
 * [createRole: create/insert role into the database]
 * @param  {[string]} title [name of the role]
 * @return {[string]}  successfully created/inserted role     [Role successfully created/inserted into the database]
 */
exports.createRole = function(title, cb) {
  _models.Role.findOne({
    title: title
  }).then(function(role) {
    if (!role) {
      var newRole = {
        title: title
      };
      _models.Role.create(newRole, function(err, role) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, role);
        }
      });
    } else {
      cb("Role already exists", null);
    }
  });
};
//createRole('Assistant');

/**
 * [createRole: create/insert role into the database]
 * @param  {[string]} title [name of the document]
 * @param  {[string]} content [content of the doc]
 * @param  {[string]} userName [username of the creator of the doc]
 * @param  {[string]} role [roles with access to the doc]
 * @return {[string]}  successfully created/inserted document     [Document successfully created/inserted into the database]
 */
exports.createDocument = function(title, content, userName, role, cb) {
  _models.User.findOne({
    userName: userName
  }).then(function(user) {
    if (user) {
      _models.Role.findOne({
        title: role
      }).then(function(role) {
        if (!role)
          cb("Role does not exist. Create first", null);
        else {
          _models.Document.findOne({
            title: title,
            content: content
          }).then(function(document) {
            if (!document) {
              var newDocument = {
                title: title,
                content: content,
                createdAt: new Date(),
                userId: user._id,
                roles: role
              };
              _models.Document.create(newDocument, function(err, document) {
                if (err) {
                  cb(err, null);
                } else {
                  cb(null, document);
                }
              });
            } else {
              cb("Document already exist", null);
            }
          });
        }
      });
    } else {
      cb("User does not exist", null);
    }
  });
};
//createDocument ("mongo doc", "this is a mongodoc", "law", "Assistant");

/**
 * [getAllUsers: returns all exisitng users in the database]
 * @return {[object]} [all the users available in the database]
 */
exports.getAllUsers = function(cb) {
  _models.User.find({}, function(err, users) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, users);
    }
  });
};
// getAllUsers(function (err, users) {
//     console.log(users);
// });

/**
 * [getAllRoles: returns all exisitng roles in the database]
 * @return {[object]} [all exisitng roles in the database]
 */
exports.getAllRoles = function(cb) {
  _models.Role.find({}, function(err, roles) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, roles);
    }
    //cb(null, roles);
  });
};
// getAllRoles( function (err, roles){
//     console.log(roles);
// });

/**
 * [getAllDocuments: returns all exisitng documents in the database within the specified limit]
 * @param  {[integer]} limit [number of documents that should be returned]
 * @return {[object]}       [exisitng documents in the database within the specified limit]
 */
exports.getAllDocuments = function(limit, cb) {
    var doc = _models.Document.find({})
      .limit(+limit)
      .sort('+createdAt');

    doc.exec(function(err, doc) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, doc);
      }
    });
  };
  //getAllDocuments(1);

/**
 * [getAllDocumentsByDate: exisitng documents in the database within the specified role/limit]
 * @param  {[string]} role  [description]
 * @param  {[int]} limit [number of documents that should be returned]
 * @return {[object]}       [exisiting documents in the database within the specified date/limit]
 */
var getAllDocumentsByRole = function(roles, limit, cb) {
    _models.Document.find({
        roles: roles.id
      })
      .limit(+limit)
      .sort('+createdAt')
      .exec(function(err, docByRole) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, docByRole);
        }
    });
  };
  // getAllDocumentsByRole('superAdministrator', 1, function (err, doc) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(doc);
  //   }
  // });

/**
 * [getAllDocumentsByDate: exisitng documents in the database within the specified date/limit]
 * @param  {[date]} date  [description]
 * @param  {[int]} limit [number of documents that should be returned]
 * @return {[object]}       [exisitng documents in the database within the specified date/limit]
 */
exports.getAllDocumentsByDate = function(date, limit, cb) {
    _models.Document.find({
        createdAt: date
      })
      .limit(+limit)
      .sort('+createdAt')
      .exec(function(err, docsByDate) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, docsByDate);
        }
      });
  };
  // getAllDocumentsByDate("2015-12-01T11:53:06.870Z", 1, function (err, doc) {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         console.log(doc);
  //     }
  // })
