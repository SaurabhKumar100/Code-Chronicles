//server
const express = require("express");
const app = express();
const cors = require("cors");

//Database

const messageModel = require("./db/model");

//cors

app.use(cors());
app.use(express.json());

//apis

app.get("/api/messages/all", async function (req, res) {
  try {
    const allMessages = await messageModel.find();
    res.status(200).send(allMessages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/api/user/message", async function (req, res) {
  try {
    const userMessages = await messageModel.findOne({ name: "milind" });
    res.status(200).send(userMessages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/api/user/message/delete", async function (req, res) {
  try {
    const deletedMessages = await messageModel.findOneAndDelete({
      user: "Saurabh",
    });
    res.status(200).send(deletedMessages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/api/user/message/create", async function (req, res) {
  try {
    const createdMessage = await messageModel.create({
      message: "hi! there",
      user: "Saurabh",
      date: new Date(2002, 1, 12), // Correct date format
    });
    res.status(200).send(createdMessage); // Sending the created message object
  } catch (err) {
    res.status(500).send({ error: err.message }); // Handling potential errors
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
