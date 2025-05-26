// // const Group5 = require("../models/Group5");  // (corrected) import the right model

// // // Create new Group5 entry
// // exports.cc = async (req, res) => {
// //   try {
// //     const { Challenge, Quote, Tips } = req.body;

// //     // Create a new document
// //     const group5 = new Group5({
      
// //       Challenge,
// //       Quote,
// //       Tips,
// //     });

// //     // Save the document
// //     await group5.save();

// //     return res.status(201).json({
// //       success: true,
// //       message: "Group5 data saved successfully",
// //     });
// //   } catch (error) {
// //     console.error("Error creating Group5:", error.message);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to save Group5 data",
// //     });
// //   }
// // };
























const Group5 = require("../models/Group5_chall");

// Create new Group5 entry
exports.cc = async (req, res) => {
  try {
    const { Challenge, Quote, Tips } = req.body;

    // Validate or sanitize as needed here

    const group5 = new Group5({
      Challenge,
      Quote,
      Tips,
    });

    await group5.save();

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

