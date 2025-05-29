const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// GET all reports
router.get('/report', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new report
router.post('/report', async (req, res) => {
  const { userName, email, mobile, location, subject, message, coordinates } = req.body;

  const newReport = new Report({
    userName,
    email,
    mobile,
    location,
    subject,
    message,
    coordinates,
  });

  try {
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
