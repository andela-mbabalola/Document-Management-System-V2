var mongoose = require("mongoose"),
  RoleModel = require("./role"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: String,
  userName: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  roleId: [{
    type: ObjectId,
    ref: RoleModel
  }]
});

module.exports = mongoose.model('User', UserSchema);
