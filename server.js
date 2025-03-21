require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const collegeRoutes = require('./routes/collegeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware to parse JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Configuration
app.use(cors({
    origin: ["https://college-review-khaki.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// ✅ Explicitly handle OPTIONS (Preflight requests)
app.options("*", (req, res) => {
    const allowedOrigins = ["https://college-review-khaki.vercel.app", "http://localhost:5173"];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(204); // ✅ 204 No Content for OPTIONS
});

// ✅ Connect to MongoDB
connectDB();

// ✅ Ensure routes are registered
app.use("/api/auth", authRoutes);
app.use('/api/colleges', collegeRoutes);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
