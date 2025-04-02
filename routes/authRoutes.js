const express = require("express");
const { registerUser, loginUser, getAllUsers, submitReview,getAllReviews,addUser,deleteUser,updateUser,deleteReview,updateReview } = require("../controllers/authController");

const router = express.Router();

// ✅ API Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.post("/submit", submitReview);
router.get('/reviews',getAllReviews);
router.post('/api/auth/adduser',addUser);
router.put('/api/auth/users/:id',updateUser);
router.delete('/api/auth/users/:id',deleteUser);
router.delete('/api/auth/reviews/:id',deleteReview);
router.put('/api/auth/reivews/:id',updateReview);
module.exports = router;
