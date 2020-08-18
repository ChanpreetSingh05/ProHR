const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, default: false},
  empid: { type: mongoose.Schema.Types.ObjectId, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("ProHRUser", userSchema);
