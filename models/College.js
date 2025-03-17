const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    id: String,
    name: String,
    google_map_link: String,
    college_facilities: mongoose.Schema.Types.Mixed,
    courses: mongoose.Schema.Types.Mixed
});
module.exports = mongoose.model("College", collegeSchema);
