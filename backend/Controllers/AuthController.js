const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const Consultant = require('../Models/Consultant');
const cloudinary = require('../Helpers/cloudinary');
const fs = require('fs');

const signup = async (req, res) => {
  try {
    const { name, email, contact, location, password, role } = req.body; // include role here!

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists, please login',
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      contact,
      location,
      password: hashedPassword,
      role, // this should be either 'farmer' or 'consultant'
    });

    await newUser.save();

    // 👉 If the user is a consultant, also save in Consultant collection
    if (role === 'consultant') {
      const newConsultant = new Consultant({
        userId: newUser._id,
        bio: 'New consultant available for advice.',
        specialties: [],
        fee: 0,
        imageUrl: '', // optional for now
        location: newUser.location,
      });
      await newConsultant.save();
    }

    res.status(201).json({
      message: 'Signup successful',
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal server error during signup',
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const errorMsg = 'Auth failed: Email or password is incorrect';
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login success',
      success: true,
      jwtToken,
      id: user._id,
      role: user.role, // send role to frontend too
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal server error during login',
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
