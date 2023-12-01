const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const mongoUrl = "mongodb+srv://oscar:oscar@cluster0.oippzx6.mongodb.net/UserInfo?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");

app.get("/",(req,res)=>{
  res.json("hello");
})

app.post("/post", async (req, res) => {
  const { id, name, phone, place, vehicle, required, timestamp, date, time } = req.body;

  try {
    const newUser = await User.create({
      id,
      name,
      phone,
      place,
      vehicle,
      required,
      timestamp,
      date,
      time,
    });

    res.send({ status: "ok", user: newUser });
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((e) => e.message);
      res.status(400).send({ status: "validation error", message: validationErrors });
    } else {
      res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
  }
});

app.get("/get", async (req, res) => {
  try {
    const allUsers = await User.find();
    if (allUsers.length > 0) {
      res.send({ status: "ok", users: allUsers });
    } else {
      res.send({ status: "not found", message: "No users found" });
    }
  } catch (error) {
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Server is Running")
})
