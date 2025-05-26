const mongoose = require("mongoose");

const Group1 = new mongoose.Schema(
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

module.exports = mongoose.model("Group1", Group1);