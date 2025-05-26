const mongoose = require("mongoose");

const Group4_challSchema = new mongoose.Schema({
  
  

  Challenge: {
    steps: Number, // Array of step descriptions
    caloriesBurned: {
      type: Number,
      default: 0,
    },
    caloriesRunning: {
      type: Number,
      default: 0,
    },
    caloriesCycling: {
      type: Number,
      default: 0,
    },
  },

  Quote: {
    type: String,
  },

  Tips: {
    waterIntake: {
      type: Number, // in liters
    },
    calorieIntake: {
      type: Number,
    },
    sleepHours: {
      type: Number,
    },
    foodRecommendation: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Group4_chall", Group4_challSchema);
