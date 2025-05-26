const express = require("express");
const router = express.Router();

// Importing Controllers
const { signup } = require("../controllers/signup.js");
const { login } = require("../controllers/signup.js");  
const { auth, isAdmin, isStudent } = require("../middlewares/autherization")

const {user_info} = require("../controllers/user_info.js");
const { submitAdminInfo } = require('../controllers/admin_info');
// const { group4,addItem,deleteItem } = require('../controllers/group4.js');
const { storeData} = require('../controllers/Group4a.js');
const { deleteData} = require('../controllers/Group4a.js');
const { getAllData} = require('../controllers/Group4a.js');
const { cc} = require('../controllers/group5.js');
const { cc1} = require('../controllers/group2.js');


//define APi routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/add",storeData);
router.delete("/delete",deleteData); 
router.get("/data",getAllData);  
router.post("/chall",cc); 
router.post("/chall1",cc1); 
// router.post("/deleteItema",deleteItema);




//for perosnal info
router.post("/admin_info", submitAdminInfo);
router.post("/user_info", user_info);



module.exports = router;