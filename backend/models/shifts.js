const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  Date: { type: String, required: true },
  position: { type: String, required: true },
  employee_id: {type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model("ProHRShifts", userSchema);
