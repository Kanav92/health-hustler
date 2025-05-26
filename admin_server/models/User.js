const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(   
    {
        name:{
            type:String,
            required:true,
            maxLength:50,
        },
        email: {
            type:String,
            required:true,
            maxLength:50,
        },
        password:{
            type:String,
            required:true,
        },
        role: {
          type: String,
          required: true,
          enum: ['Admin', 'User'],
          default: 'Admin',
      },

      walletAddress:{
        type: String,
          required: true,
      },
      
        height: {
            type: Number, 
            min: 30, 
            max: 300, 
          },
          weight: {
            type: Number, 
            min: 1, 
            max: 500, 
          },
          age: {
            type: Number, 
            min: 0, 
            max: 150, 
          },
          gender: {
            type: String,
            enum: ["Male", "Female", "Other"], 
          },
          medicalConditions: {
            type: String,
            enum: ["a", "b", "c"], 
          },
          walletAddress: {
            type: String,
            maxLength: 100, 
          },
          applied: { type: Boolean, default: false },  
          verified: { type: Boolean, default: false },
          group: {
            type: String,
            enum: ["a", "b", "c",'d','e','f','g'], 
          },

    }
);

module.exports = mongoose.model("userSchema", userSchema);