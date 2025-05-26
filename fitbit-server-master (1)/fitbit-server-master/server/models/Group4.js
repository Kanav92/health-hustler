const mongoose = require("mongoose");

const Group4 = new mongoose.Schema(
    {
         name: {
            type: String,
            maxLength: 50,
         },
         point:{
            type:Number,
         }
       
           
        
    }
);

module.exports = mongoose.model("Group4", Group4);
