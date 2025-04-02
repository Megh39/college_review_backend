const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
user_id: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    college_name: { type: String, required: true },
    course: { type: String, required: true }
}, { collection: "user_details" });

module.exports = mongoose.model("User", userSchema);
