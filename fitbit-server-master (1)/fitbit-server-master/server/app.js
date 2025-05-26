const express = require("express");
const axios = require("axios");
const session = require("express-session");
const cors = require("cors");
const User = require("./models/User");

const Group1 = require("./models/Group1");
const Group2 = require("./models/Group2");
const  Group3= require("./models/Group3");
const Group4 = require("./models/Group4");
const Group5 = require("./models/Group5");
const Group6 = require("./models/Group6");
const Group7 = require("./models/Group7");
const Group1_chall = require("./models/Group1_chall");
const Group2_chall = require("./models/Group2_chall");
const  Group3_chall= require("./models/Group3_chall");
const Group4_chall = require("./models/Group4_chall");
const Group5_chall = require("./models/Group5_chall");
const Group6_chall = require("./models/Group6_chall");
const Group7_chall = require("./models/Group7_chall");


const dbConnect = require("./config/database");
dbConnect();

const app = express();
app.use(cors({ origin: ["*"], credentials: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

const CLIENT_ID = "23QCJS";
const CLIENT_SECRET = "be2b993a4aa0fa2a9b8c23f0c1749a6e";
const REDIRECT_URI = "https://fitbit-app-frontend.vercel.app/callback";


let a ;

// Step 1: Handle Fitbit OAuth Callback
app.get("/callback", async (req, res) => {
    const code = req.query.code;
    console.log("code", code);
    console.log("req.query", REDIRECT_URI);
    if (!code) return res.status(400).send("Authorization code not found");

    try {
        const tokenResponse = await axios.post("https://api.fitbit.com/oauth2/token",
            new URLSearchParams({
                // client_id: CLIENT_ID,
                grant_type: "authorization_code",
                redirect_uri: REDIRECT_URI,
                code: code
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
                }
            });

        req.session.accessToken = tokenResponse.data.access_token;
        req.session.userId = tokenResponse.data.user_id;
        a = tokenResponse.data.user_id;
        
        res.json({ user_id: tokenResponse.data.user_id, access_token: tokenResponse.data.access_token });
    } catch (error) {
        console.log(error)
        console.error("Error exchanging code for token:", error.response?.data || error.message);
        res.status(500).send("Authentication failed");
    }
});

app.get("/", async (req, res) => {
    res.send("backend is running");
});








app.get("/profile", async (req, res) => {
    const authHeader = req.headers.authorization;
    const userId = a;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Not authenticated");
    }

    const accessToken = authHeader.split(" ")[1];

    try {
        const headers = {
            "Authorization": `Bearer ${accessToken}`
        };

        const today = new Date().toISOString().split("T")[0];

        const [profileRes, stepsRes, caloriesRes] = await Promise.all([
            axios.get(`https://api.fitbit.com/1/user/${userId}/profile.json`, { headers }),
            axios.get(`https://api.fitbit.com/1/user/${userId}/activities/steps/date/today/today.json`, { headers }),
            axios.get(`https://api.fitbit.com/1/user/${userId}/activities/date/${today}.json`, { headers })
        ]);

        const name = profileRes.data.user.fullName;
        const distances = caloriesRes.data.summary.distances || [];
        const walking = distances.find(d => d.activity === "total")?.distance || 0;
        const running = distances.find(d => d.activity === "veryActive")?.distance || 0;
        const cycling = distances.find(d => d.activity === "moderatelyActive")?.distance || 0;
        const age = profileRes.data.user.age;
        const height = profileRes.data.user.height;
        const weight = profileRes.data.user.weight;
        const gender = profileRes.data.user.gender;
        const steps = stepsRes.data["activities-steps"][0]?.value || 0;
        const calories = caloriesRes.data.summary.caloriesOut;

        const BMI = weight / ((height / 100) ** 2);

        // Determine group
        let group;
        if (gender === 'MALE') {
            group = (age <= 50)
                ? (BMI < 18.5 ? 'd' : (BMI <= 24.9 ? 'g' : 'e'))
                : 'f';
        } else {
            group = (age <= 50)
                ? (BMI < 18.5 ? 'a' : (BMI <= 24.9 ? 'g' : 'b'))
                : 'c';
        }

        // Store user in corresponding group collection
        const groupModels = {
            a: Group1,
            b: Group2,
            c: Group3,
            d: Group4,
            e: Group5,
            f: Group6,
            g: Group7
        };




        // Fetch group challenge data first
const groupChallModels = {
    a: Group1_chall,
    b: Group2_chall,
    c: Group3_chall,
    d: Group4_chall,
    e: Group5_chall,
    f: Group6_chall,
    g: Group7_chall
};

const GroupChallModel = groupChallModels[group];
let groupData = {};
let points = 0;

if (GroupChallModel) {
    const doc = await GroupChallModel.findOne();
    if (doc) {
        const challenge = doc.Challenge || {};
        groupData = {
            challenge,
            quote: doc.Quote || "",
            tips: doc.Tips || {}
        };

        // Safely calculate points
        const step_con = 0.25 * (steps / challenge.steps);
        const calories_con = 0.25 * (calories / challenge.caloriesBurned);
        const run_con = 0.25 * (running / challenge.caloriesRunning);
        const cycle_con = 0.25 * (cycling / challenge.caloriesCycling);

        points = Math.round((step_con + calories_con + run_con + cycle_con) * 100) / 100;
    }
}

        const GroupModel = groupModels[group];
if (GroupModel) {
    const existing = await GroupModel.findOne({ name });
    if (!existing) {
        await new GroupModel({ name, point: points }).save();
    } else {
        existing.point = points;
        await existing.save();
    }
}





        
        
       

        // Update or create user
        let user = await User.findOne({ name });
        if (user) {
            user.steps = steps;
            user.calories = calories;
            user.walking = walking;
            user.running = running;
            user.cycling = cycling;
            await user.save();
        } else {
            await new User({
                name,
                age,
                height,
                weight,
                gender,
                steps,
                calories,
                walking,
                running,
                cycling,
                group
            }).save();
        }


        let leaderboard = [];
if (GroupModel) {
    leaderboard = await GroupModel.find().sort({ point: 1 }).select("name point -_id");
}


        res.json({
            profile: profileRes.data,
            steps: stepsRes.data,
            calories: caloriesRes.data.summary,
            groupInfo: groupData,
            leaderboard
        });
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        res.status(500).send("Error fetching user profile");
    }
});


app.listen(5000, () => console.log("Server running on http://localhost:5000"));



































