const mongoose = require('mongoose');
const College = require('../models/College');

// Connect to MongoDB (You can call this function in your main server file)
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/college_review_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
};

// Fetch all colleges
const getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch colleges", error: error.message });
    }
};

// Fetch a single college by ID
const getCollegeById = async (req, res) => {
    const { id } = req.params;

    try {
        const college = await College.findOne({ id });
        if (!college) return res.status(404).json({ message: "College not found" });
        
        res.json(college);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch college", error: error.message });
    }
};

module.exports = { connectDB, getAllColleges, getCollegeById };
