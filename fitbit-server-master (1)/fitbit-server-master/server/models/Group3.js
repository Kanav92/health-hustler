const mongoose = require("mongoose");

const Group3 = new mongoose.Schema(
    {
         name: {
            type: String,
            maxLength: 50,
         },
         point:{
            type:Number,
         },
       
           
        
    }
);

module.exports = mongoose.model("Group3", Group3);
