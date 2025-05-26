const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(cookieParser());


// Signup route handler
exports.signup = async (req, res) => {
  try {
    // Extract user details from the request body
    const { name, email, password,walletAddress, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      walletAddress,
      role,
    });

    const payload = {      
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        walletAddress : user.walletAddress,
        role: user.role,
      },
      token
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while signing up. Please try again.",
    });
  }
};

// Login route handler
exports.login = async (req, res) => {
  try {
    // Extract login credentials
    const { email, password } = req.body;

    // Ensure all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist.",
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Create a JWT token
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      verified: user.verified,
      group: user.group
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

   
    

    return res.status(200).json({ message: "Login successful", token });

  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging in. Please try again.",
    });
  }
};



// exports.Userinfo = async (req, res) => {
//   try {
//     // Extract token from cookies
//     const token = req.cookies?.token;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized. Token not provided.",
//       });
//     }

//     // Verify and decode the token
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid or expired token. Please log in again.",
//       });
//     }

//     // Check if the role is "admin"
//     if (decoded.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Admin privileges required.",
//       });
//     }

//     const userId = decoded.id;

//     // Extract personal information from the request body
//     const { height, weight, age, gender, medicalConditions, walletAddress } = req.body;

//     // Validate required fields
//     if (!height || !weight || !age || !gender || !walletAddress) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields. Please provide all necessary information.",
//       });
//     }

//     // Update the user's personal information
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         height,
//         weight,
//         age,
//         gender,
//         medicalConditions,
//         walletAddress,
//       },
//       { new: true, runValidators: true } // Return the updated document and validate input
//     );

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Personal information updated successfully.",
//       data: {
//         id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         height: updatedUser.height,
//         weight: updatedUser.weight,
//         age: updatedUser.age,
//         gender: updatedUser.gender,
//         medicalConditions: updatedUser.medicalConditions,
//         walletAddress: updatedUser.walletAddress,
//       },
//     });
//   } catch (err) {
//     console.error("Error in updating user info:", err.message);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while updating personal information.",
//     });
//   }
// };




