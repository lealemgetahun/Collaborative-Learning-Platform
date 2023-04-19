const User = require("../models/user");
const express = require("express");
const app = express();
app.use(express.json());

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, about } = req.body
    const user = new User({ name:name, email:email, hashed_password:password, about:about });
    await user.save();
    res.status(200).json({ message: "User successfully registered", user });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "User registration failed", error: error.message });
  }
};
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
exports.deleteuser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send(`user with id ${id} is not found`);
    }
    await user.remove();
    return res.status(200).send(user);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
