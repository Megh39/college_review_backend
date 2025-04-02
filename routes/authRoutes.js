const express = require("express");
const { registerUser, loginUser, getAllUsers, submitReview, getAllReviewsAdmin,getAllApprovedReviews, addUser, deleteUser, updateUser, deleteReview, updateReview } = require("../controllers/authController");

const router = express.Router();

// API Routes (no /api/auth prefix here, as it’s added by app.use("/api/auth", authRoutes))
router.post("/register", registerUser);         // POST /api/auth/register
router.post("/login", loginUser);               // POST /api/auth/login
router.get("/users", getAllUsers);              // GET /api/auth/users
router.post("/users", addUser);                 // POST /api/auth/users
router.put("/users/:id", updateUser);           // PUT /api/auth/users/:id
router.delete("/users/:id", deleteUser);        // DELETE /api/auth/users/:id
router.post("/submit", submitReview);           // POST /api/auth/submit
router.get("/approvedreviews",getAllApprovedReviews) //GET /api/auth/approvedreviews
router.get("/reviews", getAllReviewsAdmin);          // GET /api/auth/reviews
router.put("/reviews/:id", updateReview);       // PUT /api/auth/reviews/:id
router.delete("/reviews/:id", deleteReview);    // DELETE /api/auth/reviews/:id

module.exports = router;