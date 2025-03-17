const express = require('express');
const router = express.Router();
const { getAllColleges, getCollegeById } = require('../controllers/collegeController');

// Fetch all colleges
router.get('/', getAllColleges);

// Fetch a single college by ID
router.get('/:id', getCollegeById);

module.exports = router;
