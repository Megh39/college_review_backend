const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin")
const Review = require("../models/Review");
const registerUser = async (req, res) => {
    const { username, email, password, age, college_name, course } = req.body;

    if (!username || !email || !password || !age) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Find the highest existing user_id
        const lastUser = await User.findOne().sort({ user_id: -1 }); // Get user with max user_id
        const newUserId = lastUser ? lastUser.user_id + 1 : 1; // Increment or start at 1

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            user_id: newUserId,
            username,
            email,
            password: hashedPassword,
            age,
            college_name,
            course
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const loginUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email && !username) {
        return res.status(400).json({ message: "Email or username required" });
    }

    try {
        let user = null;
        let role = "user";

        if (username) {
            user = await Admin.findOne({ username });
            if (user) {
                if (user.password !== password) {
                    return res.status(401).json({ message: "Invalid admin password" });
                }
                role = "admin";
            }
        }

        if (!user) {
            user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
        }

        res.status(200).json({
            message: "Login successful",
            user: { ...user._doc, role }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const submitReview = async (req, res) => {
    const { user_id,username, college_name, course_name, rating, feedback } = req.body;
    const lastReview = await Review.findOne().sort({ review_id: -1 }); // Get review with max review_id
    let newReviewId = "R1"; // Default for first review

    if (lastReview && lastReview.review_id) {
        const lastIdNumber = parseInt(lastReview.review_id.substring(1)); // Extract the number part
        newReviewId = `R${lastIdNumber + 1}`; // Increment and create new ID
    }
    if (!user_id || !college_name || !course_name || !rating || !feedback) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 1 || rating > 10) {
        return res.status(400).json({ message: "Rating must be between 1 and 10" });
    }

    try {
        const newReview = new Review({
            review_id: newReviewId,

            user_id,
            username,
            college_name,
            course_name,
            rating,
            feedback,
            // review_status: "pending", // Default status
        });

        await newReview.save();
        res.status(201).json({ message: "Review submitted successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
module.exports = { registerUser, loginUser, getAllUsers, submitReview, getAllReviews };
