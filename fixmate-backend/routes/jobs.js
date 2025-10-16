const express = require('express');
const router = express.Router();
const { protect, userOnly, workerOnly } = require('../middleware/auth');

router.post('/', userOnly, (req, res) => {
  res.json({ success: true, message: 'Create job endpoint' });
});

router.get('/', protect, (req, res) => {
  res.json({ success: true, message: 'Get jobs', data: [] });
});

router.get('/:id', protect, (req, res) => {
  res.json({ success: true, message: 'Get job by ID' });
});

router.post('/:id/accept', workerOnly, (req, res) => {
  res.json({ success: true, message: 'Accept job' });
});

module.exports = router;
