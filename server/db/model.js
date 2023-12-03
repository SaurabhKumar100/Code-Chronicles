const mongoose = require("mongoose");

require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const messageSchema = mongoose.Schema({
  message: String,
  user: String,
  date: Date,
});

module.exports = mongoose.model("messages", messageSchema);
