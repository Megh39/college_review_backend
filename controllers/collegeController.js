const College = require('../models/College');


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
