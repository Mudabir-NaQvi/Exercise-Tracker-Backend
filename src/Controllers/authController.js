const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const registerUser = async (req, res) => {
  // get all data from body
  const { firstName, lastName, email, password } = req.body;
  // check if all the fields are filled
  if (!(firstName && lastName && email && password)) {
    return res.status(400).json({ message: "All fields should be filled" });
  }
  // find a user in a db - Email
  const userExist = await User.findOne({ email });
  // check if the users already exists
  if (userExist) {
    return res.status(403).json({ message: "User already exists" });
  }
  // encrypt the password
  const encryptedPassword = await bcrypt.hash(password, 10);
  console.log(encryptedPassword);
  // create a user and save it to db
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: encryptedPassword,
  });
  // send a response
  return res
    .status(201)
    .json({ message: "User registered successfully", user });
};

const loginUser = async (req, res) => {
  // get data from body
  const { email, password } = req.body;
  // check if any field is empty
  if (!(email && password)) {
    return res.status(403).json({ message: "Please fill all the fields" });
  }
  // find a user and compare passwords
  const user = await User.findOne({ email });
  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "User does not exist" });
  }
  // generate a token
  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET);
  // options object for cookie storage
  const options = {
    expires: new Date(Date.now() + 60 * 60 * 1000), // expires after 1 hour
    httpOnly: true, // only manipulated in a server
  };

  const { firstName } = user
  // store a token in a cookie with response
  return res
    .status(200)
    .cookie("access_token", token, options)
    .json({ message: "User logged in successfully",firstName, token, });
};

const logoutUser = (req, res) => {
  res
    .clearCookie("access_token")
    .json({ message: "User logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
