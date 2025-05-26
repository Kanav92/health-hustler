const mongoose = require("mongoose");

const Group5 = new mongoose.Schema(
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

module.exports = mongoose.model("Group5", Group5);
