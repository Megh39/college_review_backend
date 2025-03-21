const College = require('../models/College');
require("dotenv").config();

// ✅ Fetch all colleges
const getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch colleges', error: error.message });
    }
};

// ✅ Fetch a single college by ID
const getCollegeById = async (req, res) => {
    const { id } = req.params;
    try {
        const college = await College.findOne({ id });
        if (!college) return res.status(404).json({ message: 'College not found' });

        res.json(college);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch college', error: error.message });
    }
};

const fetchCollegeImage = async (collegeName) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
            params: {
                key: process.env.GOOGLE_API_KEY,
                cx: process.env.GOOGLE_CX,
                q: collegeName,
                searchType: 'image',
                num: 1
            }
        });

        const imageUrl = response.data.items[0].link; // First image URL
        return imageUrl;
    } catch (error) {
        console.error('Error fetching image:', error.message);
        return null;
    }
};
module.exports = { getAllColleges, getCollegeById,fetchCollegeImage };
