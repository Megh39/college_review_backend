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
        const newUserId = lastUser ? Number(lastUser.user_id) + 1 : 1; // Convert to number and increment
        const newUser = new User({
            user_id: newUserId,
            username,
            email,
            password,
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
// Add User (already covered by registerUser, but keeping endpoint consistent)
const addUser = async (req, res) => {
    const { username, email, password, age, college_name, course } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const lastUser = await User.findOne().sort({ user_id: -1 });
        const newUserId = lastUser ? Number(lastUser.user_id) + 1 : 1;

        const newUser = new User({ user_id: newUserId, username, email, password, age, college_name, course });
        await newUser.save();
        res.status(201).json({ message: "User added", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update User
const updateUser = async (req, res) => {
    const { username, email, password, age, college_name, course } = req.body;
    try {
        const user = await User.findOne({ user_id: Number(req.params.id) }); // Use user_id        if (!user) return res.status(404).json({ message: "User not found" });

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password; // Directly updating plain text password
        if (age) user.age = age;
        if (college_name) user.college_name = college_name;
        if (course) user.course = course;

        await user.save();
        res.json({ message: "User updated", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        
        const user = await User.findOne({ user_id: Number(req.params.id) }); // Use user_id
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.deleteOne({ user_id: Number(req.params.id) });
        res.json({ message: "User deleted" });
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

            if (user.password !== password) { // Direct string comparison
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
// Update Review
const updateReview = async (req, res) => {
    const { user_id, college_name, course_name, rating, feedback } = req.body;
    try {
        const review = await Review.findOne({ review_id: req.params.id });
        if (!review) return res.status(404).json({ message: "Review not found" });

        if (user_id) review.user_id = user_id;
        if (college_name) review.college_name = college_name;
        if (course_name) review.course_name = course_name;
        if (rating) review.rating = rating;
        if (feedback) review.feedback = feedback;

        await Review.updateOne({ review_id: req.params.id }, { $set: req.body });
        res.status(200).json({ message: "Review updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findOne({ review_id: req.params.id });
        if (!review) return res.status(404).json({ message: "Review not found" });


        await Review.deleteOne({ review_id: req.params.id });
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const submitReview = async (req, res) => {
    const { user_id, username, college_name, course_name, rating, feedback } = req.body;
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
        });

        await newReview.save();
        res.status(201).json({ message: "Review submitted successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};// Get ALL Reviews (Admin Only) - Includes Unapproved
const getAllReviewsAdmin = async (req, res) => {
    try {
        const reviews = await Review.find(); // Fetches all reviews, both approved and unapproved
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get ONLY Approved Reviews (Users)
const getAllApprovedReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ approved: true }); // Fetches only approved reviews
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = { registerUser, addUser, loginUser, getAllUsers,getAllApprovedReviews, submitReview, getAllReviewsAdmin, updateUser, deleteUser, updateReview, deleteReview };
