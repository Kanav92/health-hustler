const Group2 = require("../models/Group2_chall");

// Create new Group5 entry
exports.cc1 = async (req, res) => {
  try {
    const { Challenge, Quote, Tips } = req.body;

    // Validate or sanitize as needed here

    const group2 = new Group5({
      Challenge,
      Quote,
      Tips,
    });

    await group2.save();

    return res.status(201).json({
      success: true,
      message: "Group5 data saved successfully",
    });
  } catch (error) {
    console.error("Error creating Group5:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to save Group5 data",
    });
  }
};

