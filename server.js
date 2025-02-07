require("dotenv").config({ path: "./.env" });


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


// ✅ CORS Middleware
app.use(cors({
    origin: "https://college-review-khaki.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// ✅ Explicitly Handle OPTIONS Requests
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://college-review-khaki.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200); // ✅ Ensure 200 OK for preflight requests
});

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
