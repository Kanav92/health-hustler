const mongoose = require("mongoose");

const Group7 = new mongoose.Schema(
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

module.exports = mongoose.model("Group7", Group7);
