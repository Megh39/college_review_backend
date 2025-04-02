const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    review_id: { type: String, required: true },
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    college_name: { type: String, required: true },
    course_name: { type: String, required: true },
    rating: { type: Number, required: true },
    feedback: { type: String, required: true },
    approved: { type: Boolean, default: false } 

}, { collection: "review_details" });

module.exports = mongoose.model("Review", ReviewSchema);
