const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

//@desc  Register a User
//@route POST /api/User/register
//@access User
const registerUser = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = new User({ username, password, isAdmin });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
    console.log("Created User:", newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

//@desc  Register a User
//@route POST /api/user/login
//@access Admin
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, userId: user._id, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};
module.exports = { registerUser, loginUser };
