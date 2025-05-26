const mongoose = require("mongoose");

const userInfo = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            maxLength:50,
        },
        email: {
            type:String,
        //    required:true,
            maxLength:50,
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
          },
          // walletAddress: {
          //   type: String,
          //   maxLength: 100, 
          // },
          group: {
            type: String,
            enum: ["a", "b", "c",'d','e','f','g'], 
          },
          steps: {
            type: Number, 
            min: 0,  
          },
          calories: {
            type: Number, 
            min: 0,  
          },
          walking: {
            type: Number, 
            min: 0,  
          },
          running: {
            type: Number, 
            min: 0,  
          },
          cycling: {
            type: Number, 
            min: 0,  
          },
    }
);

module.exports = mongoose.model("userInfo", userInfo);
