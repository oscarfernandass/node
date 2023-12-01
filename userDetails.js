const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: Number,
  name: String,
  phone: String,
  place: String,
  vehicle: String,
  required: String,
  timestamp: String,
  date: String,
  time: String,
});

mongoose.model("UserInfo", userSchema);
