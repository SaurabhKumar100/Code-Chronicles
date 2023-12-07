//server
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//Database
const { User, Message } = require("./db/model");

// Now you can use User and Message in your code

//cors

app.use(cors());
app.use(express.json());

//apis

app.get("/api/messages/all", async function (req, res) {
  try {
    const allMessages = await Message.find();
    res.status(200).send(allMessages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/api/user/message", async function (req, res) {
  try {
    const userMessages = await Message.findOne({ name: "milind" });
    res.status(200).send(userMessages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/api/user/message/delete", async function (req, res) {
  try {
    const deletedMessages = await Message.findOneAndDelete({
      user: "Saurabh",
    });
    res.status(200).send(deletedMessages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/api/user/message/create", async function (req, res) {
  try {
    const createdMessage = await Message.create({
      message: "hi! there",
      user: "Saurabh",
      date: new Date(2002, 1, 12), // Correct date format
    });
    res.status(200).send(createdMessage); // Sending the created message object
  } catch (err) {
    res.status(500).send({ error: err.message }); // Handling potential errors
  }
});

// Registration route

app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h", // Token expiry time
    });

    // Send token and user details as response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST route to handle registration via Google

// Function to send an email with Nodemailer
const sendEmail = async (email, password) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Password for SignUp",
      text: `Your password for SignUp`,
      html: `<b>password for code chronicles ${password}</b>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

app.post("/api/register-google", async (req, res) => {
  try {
    const { name, email, password, passwordString, image } = req.body; // Assuming you receive this data from Google authentication

    // Check if the user already exists in your database based on their Google ID
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance using Mongoose schema
    const newUser = new User({
      firstName: name.split(" ")[0], // Assuming you want to extract the first name
      lastName: name.split(" ")[1] || "", // Extract last name if available
      email,
      passwordString,
      password: hashedPassword,
      profileImage: image || "", // Store profile image URL if available
    });

    // Save the new user to the database
    await newUser.save();

    // Sending an email to the user after successfully registering
    await sendEmail(email, passwordString); // Assuming sendEmail is your email sending function

    // Respond with success message or user data
    return res.status(201).json({
      message: "User registered successfully",
      user: { firstName, lastName, email, profileImageS },
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
