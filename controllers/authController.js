const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin")
// Register User
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

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, age, college_name, course });
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
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { registerUser, loginUser, getAllUsers };
