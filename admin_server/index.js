const express = require("express");
const app = express();
const cors=require("cors")

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 3001;

//middleware to parse json request body
app.use(express.json());
app.use(cors())

//import routes for TODO API
const todoRoutes = require("./routes/signup");


// //mount the todo API routes
app.use("/api/v1", todoRoutes);

//start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});

//connect to the database
const dbConnect = require("./config/database");
dbConnect();

// app.get("/", (req, res) => {
//     res.send("<h1>This is HOMEPAGE baby</h1>");
// });
