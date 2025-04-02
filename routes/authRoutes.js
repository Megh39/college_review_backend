const express = require("express");
const { registerUser, loginUser, getAllUsers, submitReview,getAllReviews } = require("../controllers/authController");

const router = express.Router();

// ✅ API Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.post("/submit", submitReview);
router.get('/reviews',getAllReviews);
module.exports = router;
