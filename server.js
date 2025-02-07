require("dotenv").config({ path: "./.env" });


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


// ✅ Apply cors AFTER setting headers
app.use(cors({
    origin: "https://college-review-khaki.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",

    credentials: true
}));

// ✅ Manually set CORS headers (extra security)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://college-review-khaki.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
