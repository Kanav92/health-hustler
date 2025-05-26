const mongoose = require("mongoose");

const Group2 = new mongoose.Schema(
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

module.exports = mongoose.model("Group2", Group2);