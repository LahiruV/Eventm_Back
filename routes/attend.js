const router = require('express').Router();
const Attendance = require('../models/attend');

// Add attendance
router.post('/add', async (req, res) => {
    try {
        const { sponsorID, date } = req.body;
        const attendance = new Attendance({ sponsorID, date });
        await attendance.save();
        res.json('Attendance added successfully!');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all attendance records
router.get('/get', async (req, res) => {
    try {
        const allAttendance = await Attendance.find();
        res.json(allAttendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
