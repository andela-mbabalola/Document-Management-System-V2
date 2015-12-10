var mongoose = require ("mongoose"),
    UserModel = require ("./user"),
    RoleModel = require ("./role"),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

DocumentSchema = new Schema ({
  title: String,
  content: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  userId: [{ type: ObjectId, ref: UserModel }],
  roles: [{ type: ObjectId, ref: RoleModel }]
});

module.exports = mongoose.model('Documents', DocumentSchema);
