const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  imagePath: { type: String, default: "http://localhost:3000/uploads/default.png" },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  hiring: { type: Date, required: true },
  gender: { type: String, required: true },
  position: { type: String, required: true },
  adminid: {type: mongoose.Schema.Types.ObjectId, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("ProHREmployee", userSchema);
