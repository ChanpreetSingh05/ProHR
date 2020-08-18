const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  reason: { type: String, required: true },
  userid: {type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, required: true },
  username: { type: String, required: true }
});

module.exports = mongoose.model("ProHRTimeOff", userSchema);
