const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET; // Replace with your secret

// Controller to handle admin info submission
exports.submitAdminInfo = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    // Decode the token to get the user's email
    const decoded = jwt.verify(token, JWT_SECRET);
    const { email } = decoded;

    // Update the user record with adminInfo
    const { leadershipSkills, timeCommitment, medicalExpertise, pastExperiences } = req.body;
    const user = await User.findOne({ email });
    

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.applied=true
    await user.save()
    res.json({ message: 'Admin info updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update admin info' });
  }
};
