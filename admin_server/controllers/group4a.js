// const Group4 = require('../models/Group4_chall'); // Importing the updated model

// // Handle POST request to store individual data
// exports.storeData = async (req, res) => {
//   const { Challenge, Quote, Tips } = req.body; // Destructure Challenge, Quote, Tips
//   try {
//     // Create a new Group4 document with the provided data
//     const group4 = await Group4.create({
//       Challenge,
//       Quote,
//       Tips,
//     });

//     // If no data is provided, return an error
//     if (!Challenge && !Quote && !Tips) {
//       return res.status(400).json({ message: 'No valid data provided' });
//     }

//     // Respond with success and the created data
//     res.status(201).json({ message: 'Data added successfully', data: group4 });
//   } catch (error) {
//     console.error('Error adding data:', error);
//     res.status(500).json({ message: 'Failed to add data' });
//   }
// };

// exports.deleteData = async (req, res) => {
//   const { Challenge, Quote, Tips } = req.body; // Destructure Challenge, Quote, Tips

//   try {
//     // Check if at least one deletion criterion is provided
//     if (!Challenge && !Quote && !Tips) {
//       return res.status(400).json({ message: 'No valid data provided for deletion' });
//     }

//     // Construct query based on provided fields
//     const query = {};
//     if (Challenge) query.Challenge = Challenge;
//     if (Quote) query.Quote = Quote;
//     if (Tips) query.Tips = Tips;

//     // Perform the deletion
//     const result = await Group4.deleteMany(query);

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: 'No matching data found for deletion' });
//     }

//     res.status(200).json({ message: 'Data deleted successfully', deletedCount: result.deletedCount });
//   } catch (error) {
//     console.error('Error deleting data:', error);
//     res.status(500).json({ message: 'Failed to delete data' });
//   }
// };





const Group4 = require('../models/Group4_chall'); // Importing the updated model

// Handle POST request to store individual data
exports.storeData = async (req, res) => {
  const { Challenge, Quote, Tips } = req.body; // Destructure Challenge, Quote, Tips
  try {
    // Create a new Group4 document with the provided data
    const group4 = await Group4.create({
      Challenge,
      Quote,
      Tips,
    });

    // If no data is provided, return an error
    if (!Challenge && !Quote && !Tips) {
      return res.status(400).json({ message: 'No valid data provided' });
    }

    // Respond with success and the created data
    res.status(201).json({ message: 'Data added successfully', data: group4 });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ message: 'Failed to add data' });
  }
};

// Handle DELETE request to delete individual data
exports.deleteData = async (req, res) => {
  const { Challenge, Quote, Tips } = req.body; // Destructure Challenge, Quote, Tips

  try {
    // Check if at least one deletion criterion is provided
    if (!Challenge && !Quote && !Tips) {
      return res.status(400).json({ message: 'No valid data provided for deletion' });
    }

    // Construct query based on provided fields
    const query = {};
    if (Challenge) query.Challenge = Challenge;
    if (Quote) query.Quote = Quote;
    if (Tips) query.Tips = Tips;

    // Perform the deletion
    const result = await Group4.deleteMany(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No matching data found for deletion' });
    }

    res.status(200).json({ message: 'Data deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ message: 'Failed to delete data' });
  }
};

// Handle GET request to fetch all stored data
exports.getAllData = async (req, res) => {
  try {
    // Fetch all data from the database
    const allData = await Group4.find({});

    // If no data is found, return a message
    if (allData.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    // Respond with the fetched data
    res.status(200).json({ message: 'Data fetched successfully', data: allData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
};















