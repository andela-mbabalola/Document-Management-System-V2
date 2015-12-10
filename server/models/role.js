var mongoose = require ('mongoose'),
    Schema =  mongoose.Schema;

RoleSchema = new Schema ({
  title: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Role', RoleSchema);
