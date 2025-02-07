const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: "admin_details" });

module.exports = mongoose.model("Admin", AdminSchema);
