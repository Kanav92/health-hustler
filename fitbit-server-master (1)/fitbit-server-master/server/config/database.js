const mongoose = require("mongoose");

// require("dotenv").config();

const dbConnect = () => {
    mongoose.connect("mongodb+srv://Siya:RHd2bDMGiEF1yGZT@cluster0.xxiot5l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB ka Connection is Successful"))
    .catch( (error) => {
        console.log("Issue in DB Connection");
        console.error(error.message);
        //iska matlab kya h ?
        // process.exit(1);
    } );
}

module.exports = dbConnect;
