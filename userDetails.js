const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  phone: String,
  from: String,
  to: String,
  vehicle: String,
  required: String,
  timestamp: String,
  date: String,
  time: String,
});

mongoose.model("UserInfo", userSchema);
