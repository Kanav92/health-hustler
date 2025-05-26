const User = require("../models/User");
const Group1 = require("../models/Group1");
const Group2 = require("../models/Group2");
const  Group3= require("../models/Group3");
const Group4 = require("../models/Group4");
const Group5 = require("../models/Group5");
const Group6 = require("../models/Group6");
const Group7 = require("../models/Group7"); 
const jwt = require("jsonwebtoken")
require("dotenv").config();
exports.user_info = async (req, res) => {
  try {
    const { height, weight, age, gender, medicalConditions, walletAddress } = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You must be signed in to update the user info.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }

    const email = decoded.email;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const BMI=(weight)/(height**2);

    if (gender === 'Male') {
      if (age<=50){
        if (BMI<18.5){
          existingUser.group = 'd';    
          // navigate('/groupsa');
        }
        else if(BMI>=18.5 && BMI<=24.9){    
          existingUser.group = 'g';
        }
        else{
          existingUser.group = 'e';
        }
      }
      else{
        existingUser.group = 'f';
      }
    } else {
      if (age<=50){
        if (BMI<18.5){
          existingUser.group = 'a';
        }
        else if(BMI>=18.5 && BMI<=24.9){
          existingUser.group = 'g';
        }
        else{
          existingUser.group = 'b';
        }
      }
      else{
        existingUser.group = 'c';   
      }
    }

    



    existingUser.height = height;
    existingUser.weight = weight;
    existingUser.age = age;
    existingUser.gender = gender;
    existingUser.medicalConditions = medicalConditions;
    existingUser.walletAddress = walletAddress;



    await existingUser.save();

    if (existingUser.group === 'a') {
      await Group1.create({
        name: existingUser.name, // Make sure `name` exists in your `User` schema
        email: existingUser.email,
        // Replace with actual admin value if needed
      });
    }
    if (existingUser.group === 'b') {
      await Group2.create({
        name: existingUser.name, // Make sure `name` exists in your `User` schema
        email: existingUser.email,
        // Replace with actual admin value if needed
      });
    }
    if (existingUser.group === 'c') {
      await Group3.create({
        name: existingUser.name, // Make sure `name` exists in your `User` schema
        email: existingUser.email,
        // Replace with actual admin value if needed
      });
    }
    if (existingUser.group === 'd') {
      await Group4.create({
        name: existingUser.name, // Make sure `name` exists in your `User` schema
        email: existingUser.email,
        // Replace with actual admin value if needed
      });
    }
    if (existingUser.group === 'e') {
      await Group5.create({
        name: existingUser.name, // Make sure `name` exists in your `User` schema
        email: existingUser.email,
        // Replace with actual admin value if needed
      });
    }
    if (existingUser.group === 'f') {
      await Group6.create({
        name: existingUser.name, // Make sure `name` exists in your `User` schema
        email: existingUser.email,
        // Replace with actual admin value if needed
      });
    }
    if (existingUser.group === 'g') {
      await Group7.create({
        name: existingUser.name, // Make sure `name` exists in your `User` schema
        email: existingUser.email,
        // Replace with actual admin value if needed
      });
    }
    
   

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
      height: existingUser.height,
      weight: existingUser.weight,
      age: existingUser.age,
      gender: existingUser.gender,
      medicalConditions: existingUser.medicalConditions,
      walletAddress: existingUser.walletAddress,

    };

    const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    return res.status(200).json({
      success: true,
      message: "User info updated successfully.",
      data: payload,
      token: newToken,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the user info. Please try again.",
    });
  }
};